import React from "react";
import { Button } from "../../components/ui/Button";

interface EmailInputFormProps {
  onTextChange: (text: string) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
  isLoading: boolean;
  currentFile: File | null;
}

export const EmailInputForm = ({
  onTextChange,
  onFileChange,
  onSubmit,
  isLoading,
  currentFile,
}: EmailInputFormProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
    if (file && textAreaRef.current) {
      textAreaRef.current.value = "";
      onTextChange("");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
    if (e.target.value && fileInputRef.current) {
      fileInputRef.current.value = "";
      onFileChange(null);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <label
        htmlFor="email-input"
        className="block text-lg font-medium text-gray-700"
      >
        Cole o texto do email abaixo:
      </label>
      <textarea
        id="email-input"
        ref={textAreaRef}
        rows={8}
        className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-50 resize-none"
        placeholder="Insira o conteúdo do email aqui..."
        onChange={handleTextChange}
        disabled={isLoading}
      />

      <div className="my-6 flex items-center text-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 font-semibold">OU</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700">
          Envie um arquivo (.txt ou .pdf):
        </label>
        <div className="mt-2 flex items-center gap-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 px-4 py-2 border border-gray-300 shadow-sm text-sm hover:bg-gray-50 transition-colors"
          >
            <span>Selecionar arquivo</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              ref={fileInputRef}
              accept=".txt,.pdf"
              onChange={handleFileSelect}
              disabled={isLoading}
              className="sr-only"
            />
          </label>
          {currentFile && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">{currentFile.name}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button type="submit" isLoading={isLoading}>
          Analisar
        </Button>
      </div>
    </form>
  );
};
