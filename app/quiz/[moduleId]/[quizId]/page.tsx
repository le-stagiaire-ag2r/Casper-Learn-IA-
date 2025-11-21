import { Module, Quiz } from '@/types';
import modulesData from '@/data/modules.json';
import QuizContent from '@/components/QuizContent';

export function generateStaticParams() {
  const params: { moduleId: string; quizId: string }[] = [];
  modulesData.forEach((module) => {
    module.quizzes.forEach((quiz) => {
      params.push({
        moduleId: module.id,
        quizId: quiz.id,
      });
    });
  });
  return params;
}

export default function QuizPage({ params }: { params: { moduleId: string; quizId: string } }) {
  const module = modulesData.find((m) => m.id === params.moduleId) as Module;

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Quiz introuvable</h2>
        <button
          onClick={() => window.location.href = '/'}
          className="text-casper-primary hover:underline"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  const quiz = module.quizzes.find((q) => q.id === params.quizId) as Quiz;

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Quiz introuvable</h2>
        <button
          onClick={() => window.location.href = '/'}
          className="text-casper-primary hover:underline"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return <QuizContent quizData={quiz} moduleId={params.moduleId} />;
}
