import type { ClassificationData } from "../features/classification/types";

const API_ENDPOINT = "/api/classificar";

/**
 * Envia dados do email (texto ou arquivo) para o backend usando FormData.
 * @param formData - O objeto FormData contendo 'email_text' ou 'file'.
 * @returns Uma Promise que resolve com os dados da classificação.
 */
export const classifyEmail = async (
  formData: FormData
): Promise<ClassificationData> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Falha ao comunicar com a API.");
  }

  return response.json();
};
