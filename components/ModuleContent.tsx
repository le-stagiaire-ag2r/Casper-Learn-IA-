'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Module } from '@/types';

interface ModuleContentProps {
  moduleData: Module;
}

export default function ModuleContent({ moduleData }: ModuleContentProps) {
  const router = useRouter();
  const [module] = useState<Module>(moduleData);

  const getQuizProgress = (quizId: string) => {
    if (typeof window === 'undefined') return null;

    const progress = localStorage.getItem('casper-learning-progress');
    if (!progress) return null;

    const progressData = JSON.parse(progress);
    return progressData.find((p: any) => p.quizId === quizId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span>←</span>
        <span>Retour aux modules</span>
      </button>

      {/* Module Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
        <div className="flex items-start gap-6">
          <div className="text-6xl">{module.icon}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{module.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{module.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>📚 {module.quizzes.length} quiz</span>
              <span>•</span>
              <span>
                ⏱️ ~{module.quizzes.reduce((acc, q) => acc + q.estimatedTime, 0)} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quiz disponibles</h2>
        {module.quizzes.map((quiz, index) => {
          const progress = getQuizProgress(quiz.id);
          const isCompleted = !!progress;

          return (
            <Link
              key={quiz.id}
              href={`/quiz/${module.id}/${quiz.id}`}
              className="block bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-casper-primary transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold group-hover:bg-casper-primary/20 transition-colors">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-casper-primary transition-colors">
                      {quiz.title}
                    </h3>
                    {isCompleted && (
                      <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        <span>✓</span>
                        <span>{progress.score}%</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{quiz.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded ${
                      quiz.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      quiz.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {quiz.difficulty === 'beginner' ? 'Débutant' :
                       quiz.difficulty === 'intermediate' ? 'Intermédiaire' :
                       'Avancé'}
                    </span>
                    <span>📝 {quiz.questions.length} questions</span>
                    <span>⏱️ ~{quiz.estimatedTime} min</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
