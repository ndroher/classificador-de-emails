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
    <form onSubmit={handleFormSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-1 shadow-2xl">
        <textarea
          id="email-input"
          ref={textAreaRef}
          rows={8}
          className="w-full p-4 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none resize-none cursor-auto"
          placeholder="Insira o conteúdo do email aqui..."
          onChange={handleTextChange}
          disabled={isLoading}
        />
        <div className="flex justify-between items-center p-2 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 cursor-pointer rounded-md text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                attach_file
              </span>
              <span>Anexar arquivo</span>
              <input
                id="file-upload"
                type="file"
                ref={fileInputRef}
                accept=".txt,.pdf"
                onChange={handleFileSelect}
                disabled={isLoading}
                className="sr-only"
              />
            </label>
            {currentFile && (
              <p className="text-sm text-gray-400">{currentFile.name}</p>
            )}
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Analisando..."
          >
            Analisar
          </Button>
        </div>
      </div>
    </form>
  );
};
