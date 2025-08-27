import os
import json
import logging
from dotenv import load_dotenv
import google.generativeai as genai

MODEL_NAME = "gemini-1.5-flash-latest"

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

load_dotenv()

def initialize_model():
    """
    Configura e retorna o modelo generativo do Gemini.
    Retorna None se a configuração falhar.
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("Chave da API do Gemini (GEMINI_API_KEY) não encontrada no arquivo .env")
        
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(MODEL_NAME)
        
        logging.info(f"[+] API do Gemini configurada com sucesso usando o modelo '{MODEL_NAME}'.")
        return model
    except Exception as e:
        logging.error(f"[!] Erro ao configurar a API do Gemini: {e}")
        return None

model = initialize_model()


def process_email_with_gemini(email_text: str) -> dict:
    """
    Usa o modelo Gemini para classificar um email e sugerir uma resposta.

    Args:
        email_text: O texto do email a ser processado.

    Returns:
        Um dicionário contendo "classification" e "suggested_response",
        ou um dicionário de erro em caso de falha.
    """
    if not model:
        return {"error": "A API do Gemini não foi inicializada corretamente."}

    prompt = f"""
Sua tarefa é analisar o email abaixo, classificá-lo estritamente como 'Produtivo' ou 'Improdutivo', e gerar uma sugestão de resposta profissional e concisa em português.
Retorne sua análise exclusivamente no formato de um objeto JSON válido, com as chaves "classification" e "suggested_response".

---
EXEMPLOS PARA SEU APRENDIZADO:

1. Exemplo de email Produtivo:
- Email de entrada: "Prezados, o sistema está fora do ar e apresentando erro 503. Poderiam verificar com urgência?"
- JSON de saída esperado: {{"classification": "Produtivo", "suggested_response": "Olá. Recebemos seu alerta sobre a instabilidade no sistema. Nossa equipe técnica já está investigando e retornaremos em breve com uma atualização."}}

2. Exemplo de email Improdutivo:
- Email de entrada: "Obrigado pela ajuda, equipe! Tudo resolvido."
- JSON de saída esperado: {{"classification": "Improdutivo", "suggested_response": "De nada! Ficamos felizes em ajudar."}}
---

Agora, analise o seguinte email real e forneça o resultado JSON.

Email para analisar:
\"\"\"
{email_text}
\"\"\"
"""

    try:
        response = model.generate_content(prompt)
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "").strip()
        result = json.loads(cleaned_response)
        return result
    except json.JSONDecodeError as e:
        logging.error(f"Erro ao decodificar o JSON da resposta da API: {e}")
        logging.error(f"Resposta bruta recebida que causou o erro: {cleaned_response}")
        return {"error": "A IA retornou uma resposta em formato inválido."}
    except Exception as e:
        logging.error(f"Erro na chamada da API do Gemini ou outra exceção: {e}")
        return {"error": "Falha ao processar o email com a IA."}