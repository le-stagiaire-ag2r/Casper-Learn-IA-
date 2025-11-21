'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Module } from '@/types';
import modulesData from '@/data/modules.json';

export default function Home() {
  const [modules, setModules] = useState<Module[]>([]);
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0,
  });

  useEffect(() => {
    // Load modules
    setModules(modulesData as Module[]);

    // Load user stats from localStorage
    const progress = localStorage.getItem('casper-learning-progress');
    if (progress) {
      const progressData = JSON.parse(progress);
      const totalQuizzes = modulesData.reduce((acc, mod) => acc + mod.quizzes.length, 0);
      const completedQuizzes = progressData.length;
      const averageScore = completedQuizzes > 0
        ? progressData.reduce((acc: number, p: any) => acc + p.score, 0) / completedQuizzes
        : 0;

      setUserStats({ totalQuizzes, completedQuizzes, averageScore });
    } else {
      const totalQuizzes = modulesData.reduce((acc, mod) => acc + mod.quizzes.length, 0);
      setUserStats({ totalQuizzes, completedQuizzes: 0, averageScore: 0 });
    }
  }, []);

  const getModuleProgress = (moduleId: string) => {
    const progress = localStorage.getItem('casper-learning-progress');
    if (!progress) return 0;

    const progressData = JSON.parse(progress);
    const module = modules.find(m => m.id === moduleId);
    if (!module) return 0;

    const completedInModule = progressData.filter((p: any) => p.moduleId === moduleId).length;
    return (completedInModule / module.quizzes.length) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-casper-primary to-pink-500 bg-clip-text text-transparent">
          Bienvenue sur Casper Learning
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Apprenez la blockchain Casper de manière interactive avec des quiz et des exercices pratiques
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <p className="text-gray-400 text-sm">Progression</p>
              <p className="text-2xl font-bold">
                {userStats.completedQuizzes}/{userStats.totalQuizzes}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎯</div>
            <div>
              <p className="text-gray-400 text-sm">Score Moyen</p>
              <p className="text-2xl font-bold">
                {Math.round(userStats.averageScore)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏆</div>
            <div>
              <p className="text-gray-400 text-sm">Modules</p>
              <p className="text-2xl font-bold">{modules.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Modules d&apos;apprentissage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/module/${module.id}`}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-casper-primary transition-all hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{module.icon}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-casper-primary transition-colors">
                    {module.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        {module.quizzes.length} quiz disponible{module.quizzes.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-casper-primary font-semibold">
                        {Math.round(getModuleProgress(module.id))}% complété
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-casper-primary to-pink-500 h-2 rounded-full transition-all"
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-casper-primary to-pink-500 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Prêt à commencer ?</h3>
        <p className="text-white/90 mb-4">
          Choisissez un module ci-dessus et commencez votre apprentissage !
        </p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span>✓ Quiz interactifs</span>
          <span>•</span>
          <span>✓ Feedback instantané</span>
          <span>•</span>
          <span>✓ Progression sauvegardée</span>
        </div>
      </div>
    </div>
  );
}
