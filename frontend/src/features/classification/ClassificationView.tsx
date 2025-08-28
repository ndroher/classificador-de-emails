import React from "react";
import { EmailInputForm } from "./EmailInputForm";
import { ClassificationResult } from "./ClassificationResult";
import type { ClassificationData } from "./types";
// import { classifyEmail } from '../../services/classificationAPI';

export const ClassificationView = () => {
  const [emailText, setEmailText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<ClassificationData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleAnalyseEmail = async () => {
    if (!emailText.trim()) {
      setError("Por favor, insira o texto do email antes de analisar.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // const apiResult = await classifyEmail(emailText);
      // setResult(apiResult);

      setResult({
        classification: "Produtivo",
        suggested_response:
          "Olá! Recebemos sua solicitação e nossa equipe já está trabalhando nela. Retornaremos em breve.",
      });
    } catch (err) {
      setError("Ocorreu um erro ao analisar o email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <EmailInputForm
        onTextChange={setEmailText}
        onSubmit={handleAnalyseEmail}
        isLoading={isLoading}
      />
      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}
      {result && <ClassificationResult data={result} />}
    </div>
  );
};
