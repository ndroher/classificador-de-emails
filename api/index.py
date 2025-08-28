import os
from flask import Flask, jsonify, request
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename
from .ai_service import extract_text_from_file, process_email_with_gemini

app = Flask(__name__)

UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def is_allowed_file(filename):
    """Verifica se a extensão do arquivo é permitida."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint para verificar se a API está no ar."""
    return jsonify({"status": "ok", "message": "Backend is running!"})

@app.route('/api/classificar', methods=['POST'])
def classify_email():
    """
    Recebe um email via texto ou arquivo, o classifica e retorna uma resposta.
    """
    try:
        email_text = ""
        if 'file' in request.files and request.files['file'].filename != '':
            file = request.files['file']
            if not is_allowed_file(file.filename):
                raise BadRequest("Tipo de arquivo não permitido. Use .txt ou .pdf.")
            
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            try:
                email_text = extract_text_from_file(filepath)
            finally:
                os.remove(filepath)

        elif 'email_text' in request.form:
            email_text = request.form.get('email_text', '').strip()
            if not email_text:
                raise BadRequest("O campo 'email_text' não pode estar vazio.")
        else:
            raise BadRequest("Nenhum arquivo ou texto foi enviado.")

        result = process_email_with_gemini(email_text)

        if 'error' in result:
            return jsonify(result), 500
        
        return jsonify(result)

    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        app.logger.error(f"Erro inesperado no endpoint /classificar: {e}")
        return jsonify({"error": "Ocorreu um erro interno no servidor."}), 500