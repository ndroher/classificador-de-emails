import type { ClassificationData } from "../features/classification/types";

const API_ENDPOINT = "/api/classificar";

/**
 * Envia o texto de um email para o backend para classificação.
 * @param emailText - O texto do email a ser analisado.
 * @returns Uma Promise que resolve com os dados da classificação.
 * @throws Lança um erro se a resposta da API não for bem-sucedida.
 */
export const classifyEmail = async (
  emailText: string
): Promise<ClassificationData> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_text: emailText }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Falha ao comunicar com a API.");
  }

  return response.json();
};
