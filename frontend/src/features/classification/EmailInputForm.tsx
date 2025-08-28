import React from "react";
import { Button } from "../../components/ui/Button";

interface EmailInputFormProps {
  onTextChange: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const EmailInputForm = ({
  onTextChange,
  onSubmit,
  isLoading,
}: EmailInputFormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <label
        htmlFor="email-input"
        className="block text-lg font-medium text-gray-700"
      >
        Insira o texto do email abaixo:
      </label>
      <textarea
        id="email-input"
        rows={10}
        className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm transition disabled:bg-gray-50 resize-none"
        placeholder="Insira o conteúdo do email aqui..."
        onChange={(e) => onTextChange(e.target.value)}
        disabled={isLoading}
      />
      <div className="mt-6 text-center">
        <Button type="submit" isLoading={isLoading}>
          Analisar Email
        </Button>
      </div>
    </form>
  );
};
