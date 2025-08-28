import os
import json
import logging
from dotenv import load_dotenv
import google.generativeai as genai
import PyPDF2

MODEL_NAME = "gemini-1.5-flash-latest"
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
load_dotenv()

def extract_text_from_file(filepath: str) -> str:
    """Extrai texto de arquivos .txt ou .pdf."""
    text = ""
    if filepath.lower().endswith('.pdf'):
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
    elif filepath.lower().endswith('.txt'):
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
    return text

def initialize_model():
    """Configura e retorna o modelo generativo do Gemini."""
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
    """Usa o modelo Gemini para classificar um email e sugerir uma resposta."""
    if not model:
        return {"error": "A API do Gemini não foi inicializada corretamente."}

    prompt = f"""
Sua tarefa é analisar o email abaixo e gerar uma sugestão de resposta que seja um email profissional completo.

REGRAS DE FORMATAÇÃO DA RESPOSTA:
1.  **Formato de Email:** A resposta deve ter cara de um email real, com saudação, corpo e encerramento.
2.  **Parágrafos:** Utilize quebras de parágrafo (duas quebras de linha) para separar as ideias e garantir a legibilidade.
3.  **Sem Markdown:** Não utilize formatação markdown como asteriscos (*) ou hashtags (#).

Depois de gerar a resposta, classifique o email original como 'Produtivo' ou 'Improdutivo'.
Retorne sua análise exclusivamente no formato de um objeto JSON válido, com as chaves "classification" e "suggested_response".

---
EXEMPLOS PARA SEU APRENDIZADO:
1. Exemplo de email Produtivo:
- Email de entrada: "Prezados, o sistema está fora do ar e apresentando erro 503. Poderiam verificar com urgência?"
- JSON de saída esperado: {{"classification": "Produtivo", "suggested_response": "Olá.\\n\\nRecebemos seu alerta sobre a instabilidade no sistema. Nossa equipe técnica já está investigando e retornaremos em breve com uma atualização."}}

2. Exemplo de email Improdutivo com resposta:
- Email de entrada: "Obrigado pela ajuda, equipe! Tudo resolvido."
- JSON de saída esperado: {{"classification": "Improdutivo", "suggested_response": "De nada! Ficamos felizes em ajudar."}}

3. Exemplo de email Improdutivo sem resposta (spam/marketing):
- Email de entrada: "Promoção imperdível! 50% de desconto em todos os nossos produtos. Clique agora!"
- JSON de saída esperado: {{"classification": "Improdutivo", "suggested_response": ""}}
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
    except Exception as e:
        logging.error(f"Erro na chamada da API do Gemini: {e}")
        return {"error": "Falha ao processar o email com a IA."}