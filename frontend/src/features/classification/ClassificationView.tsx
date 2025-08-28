import React from "react";
import { EmailInputForm } from "./EmailInputForm";
import { ClassificationResult } from "./ClassificationResult";
import type { ClassificationData } from "./types";
import { classifyEmail } from "../../services/classificationAPI";

export const ClassificationView = () => {
  const [emailText, setEmailText] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<ClassificationData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleAnalyse = async () => {
    if (!emailText.trim() && !file) {
      setError("Por favor, insira um texto ou selecione um arquivo.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("email_text", emailText);
    }

    try {
      const apiResult = await classifyEmail(formData);
      setResult(apiResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <EmailInputForm
        onTextChange={setEmailText}
        onFileChange={setFile}
        onSubmit={handleAnalyse}
        isLoading={isLoading}
        currentFile={file}
      />
      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}
      {result && <ClassificationResult data={result} />}
    </div>
  );
};
