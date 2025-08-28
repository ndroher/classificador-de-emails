import type { ClassificationData } from "./types";
import { Card } from "../../components/ui/Card";

interface ClassificationResultProps {
  data: ClassificationData;
}

export const ClassificationResult = ({ data }: ClassificationResultProps) => {
  const isProductive = data.classification === "Produtivo";

  const variant = isProductive ? "productive" : "unproductive";
  const iconName = isProductive ? "thumb_up" : "thumb_down";

  return (
    <div className="mt-8">
      <Card variant={variant}>
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-2">{iconName}</span>
          <h3 className="text-xl font-bold">{data.classification}</h3>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resposta Sugerida:
          </label>
          <p className="text-gray-800 bg-white p-4 rounded-md shadow-sm">
            {data.suggested_response}
          </p>
        </div>
      </Card>
    </div>
  );
};
