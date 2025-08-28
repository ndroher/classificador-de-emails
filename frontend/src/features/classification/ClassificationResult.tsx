import React from "react";
import type { ClassificationData } from "./types";
import { Card } from "../../components/ui/Card";

interface ClassificationResultProps {
  data: ClassificationData;
}

export const ClassificationResult = ({ data }: ClassificationResultProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const isProductive = data.classification === "Produtivo";
  const hasResponse =
    data.suggested_response && data.suggested_response.trim() !== "";

  const variant = isProductive ? "productive" : "unproductive";
  const iconName = isProductive ? "thumb_up" : "thumb_down";

  const handleCopy = () => {
    if (hasResponse) {
      navigator.clipboard.writeText(data.suggested_response);
      setIsCopied(true);
    }
  };

  React.useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="mt-8">
      <Card variant={variant}>
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-2">{iconName}</span>
          <h3 className="text-xl font-bold">{data.classification}</h3>
        </div>
        <div className="mt-4">
          {hasResponse ? (
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-2 bg-gray-50 border-b border-gray-200">
                <label className="font-medium text-gray-700 px-2">
                  Resposta Sugerida
                </label>
                <button
                  onClick={handleCopy}
                  disabled={isCopied}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    transition-colors duration-200 hover:cursor-pointer
                    focus:outline-none
                    ${
                      isCopied
                        ? "text-green-600"
                        : "text-gray-700 hover:bg-gray-200"
                    }
                  `}
                  aria-label="Copiar resposta"
                  title={isCopied ? "Copiado!" : "Copiar resposta sugerida"}
                >
                  <span className="material-symbols-outlined text-lg">
                    {isCopied ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
              <p className="text-gray-800 p-4 w-full whitespace-pre-wrap">
                {data.suggested_response}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 italic text-center py-4">
              Nenhuma resposta é necessária para este tipo de email.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
