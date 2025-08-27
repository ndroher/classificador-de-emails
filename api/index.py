from flask import Flask, jsonify, request
from werkzeug.exceptions import BadRequest

from ai_service import process_email_with_gemini

app = Flask(__name__)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Verifica a saúde da API, retornando um status de sucesso."""
    return jsonify({"status": "ok", "message": "Backend is running!"})


@app.route('/api/classificar', methods=['POST'])
def classificar_email():
    """
    Recebe o texto de um email, o classifica e retorna uma resposta sugerida.
    Espera um corpo de requisição JSON com a chave "email_text".
    """
    try:
        data = request.get_json()
        if not data or 'email_text' not in data:
            raise BadRequest("O campo 'email_text' é obrigatório no corpo do JSON.")

        email_text = data.get('email_text', '').strip()
        if not email_text:
            raise BadRequest("O campo 'email_text' não pode estar vazio.")

        result = process_email_with_gemini(email_text)

        if 'error' in result:
            return jsonify(result), 500
        
        return jsonify(result)

    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        app.logger.error(f"Erro inesperado no endpoint /classificar: {e}")
        return jsonify({"error": "Ocorreu um erro interno no servidor."}), 500