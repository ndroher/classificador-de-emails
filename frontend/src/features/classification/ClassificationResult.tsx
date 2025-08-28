import React from "react";
import { motion } from "framer-motion";
import type { ClassificationData } from "./types";

interface ClassificationResultProps {
  data: ClassificationData;
}

export const ClassificationResult = ({ data }: ClassificationResultProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const isProductive = data.classification === "Produtivo";
  const hasResponse =
    data.suggested_response && data.suggested_response.trim() !== "";
  const handleCopy = () => {
    if (hasResponse) {
      navigator.clipboard.writeText(data.suggested_response);
      setIsCopied(true);
    }
  };

  React.useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const cardClasses = isProductive
    ? "border-indigo-500/50 shadow-indigo-500/10"
    : "border-gray-700";

  const headerClasses = isProductive
    ? "bg-indigo-600 text-white"
    : "bg-gray-700 text-gray-300";

  const iconName = isProductive ? "thumb_up" : "thumb_down";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-800/50 backdrop-blur-sm border rounded-lg max-w-2xl mx-auto shadow-lg overflow-hidden ${cardClasses}`}
    >
      <div className={`flex items-center p-3 ${headerClasses}`}>
        <span className="material-symbols-outlined mr-2">{iconName}</span>
        <h3 className="text-lg font-bold">{data.classification}</h3>
      </div>

      <div className="p-4">
        {hasResponse ? (
          <div className="bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-2 bg-gray-800/70">
              <label className="text-sm font-medium text-gray-300 px-2">
                Resposta Sugerida
              </label>
              <button
                onClick={handleCopy}
                disabled={isCopied}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isCopied
                    ? "text-green-500"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white hover:cursor-pointer"
                } focus:outline-none`}
                title={isCopied ? "Copiado!" : "Copiar"}
              >
                <span className="material-symbols-outlined text-lg">
                  {isCopied ? "check" : "content_copy"}
                </span>
              </button>
            </div>
            <p className="p-4 text-gray-300 whitespace-pre-wrap">
              {data.suggested_response}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 italic text-center py-4">
            Nenhuma resposta é necessária para este email.
          </p>
        )}
      </div>
    </motion.div>
  );
};
