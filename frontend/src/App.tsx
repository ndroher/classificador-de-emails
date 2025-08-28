import { ClassificationView } from "./features/classification/ClassificationView";
import { PageWrapper } from "./components/layout/PageWrapper";

const App = () => {
  return (
    <PageWrapper>
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Classificador de Emails com IA
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Otimize seu tempo. Deixe a IA classificar seus emails e sugerir
          respostas.
        </p>
      </header>
      <main className="bg-white p-8 rounded-xl shadow-lg mt-8">
        <ClassificationView />
      </main>
    </PageWrapper>
  );
};

export default App;
