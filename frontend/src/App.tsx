import { ClassificationView } from "./features/classification/ClassificationView";
import { PageWrapper } from "./components/layout/PageWrapper";

const App = () => {
  return (
    <PageWrapper>
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 pb-2">
          Classificador de Emails
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Otimize seu tempo. Deixe nossa IA classificar e sugerir a resposta
          ideal para você.
        </p>
      </header>{" "}
      <ClassificationView />
    </PageWrapper>
  );
};

export default App;
