'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Quiz, Question } from '@/types';

interface QuizContentProps {
  quizData: Quiz;
  moduleId: string;
}

export default function QuizContent({ quizData, moduleId }: QuizContentProps) {
  const router = useRouter();
  const [quiz] = useState<Quiz>(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    setAnswers([...answers, selectedAnswer]);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz completed
      const score = Math.round(
        ((answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length +
          (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)) /
          quiz.questions.length) *
          100
      );

      // Save progress
      const progress = localStorage.getItem('casper-learning-progress');
      const progressData = progress ? JSON.parse(progress) : [];

      // Update or add progress
      const existingIndex = progressData.findIndex(
        (p: any) => p.moduleId === moduleId && p.quizId === quiz.id
      );

      const newProgress = {
        moduleId: moduleId,
        quizId: quiz.id,
        score,
        completedAt: new Date().toISOString(),
        answers: [...answers, selectedAnswer],
      };

      if (existingIndex >= 0) {
        progressData[existingIndex] = newProgress;
      } else {
        progressData.push(newProgress);
      }

      localStorage.setItem('casper-learning-progress', JSON.stringify(progressData));
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length +
      (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  if (isCompleted) {
    const score = calculateScore();
    const correctAnswers = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 text-center space-y-6">
          <div className="text-6xl mb-4">
            {score >= 80 ? '🏆' : score >= 60 ? '🎯' : '📚'}
          </div>
          <h2 className="text-3xl font-bold">Quiz Terminé !</h2>
          <div className="text-5xl font-bold text-casper-primary">{score}%</div>
          <p className="text-xl text-gray-300">
            {correctAnswers} / {quiz.questions.length} réponses correctes
          </p>
          <div className="pt-4">
            {score >= 80 ? (
              <p className="text-green-400 text-lg">Excellent travail ! 🎉</p>
            ) : score >= 60 ? (
              <p className="text-yellow-400 text-lg">Bon travail ! Continuez comme ça ! 💪</p>
            ) : (
              <p className="text-orange-400 text-lg">Continuez à apprendre ! 📖</p>
            )}
          </div>
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => router.push(`/module/${moduleId}`)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Retour au module
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
                setAnswers([]);
                setIsCompleted(false);
              }}
              className="px-6 py-3 bg-casper-primary hover:bg-casper-primary/80 rounded-lg transition-colors"
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(`/module/${moduleId}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Retour</span>
        </button>
        <div className="text-sm text-gray-400">
          Question {currentQuestionIndex + 1} / {quiz.questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-casper-primary to-pink-500 h-2 rounded-full transition-all"
          style={{
            width: `${((currentQuestionIndex + (showExplanation ? 1 : 0)) / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
        <div className="mb-6">
          <span className={`text-sm px-3 py-1 rounded ${
            currentQuestion.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
            currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentQuestion.difficulty === 'beginner' ? 'Débutant' :
             currentQuestion.difficulty === 'intermediate' ? 'Intermédiaire' :
             'Avancé'}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-6">{currentQuestion.question}</h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showCorrect = showExplanation && isCorrect;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : showIncorrect
                    ? 'border-red-500 bg-red-500/10'
                    : isSelected
                    ? 'border-casper-primary bg-casper-primary/10'
                    : 'border-gray-600 hover:border-gray-500'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showCorrect
                        ? 'border-green-500 bg-green-500'
                        : showIncorrect
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                        ? 'border-casper-primary bg-casper-primary'
                        : 'border-gray-500'
                    }`}
                  >
                    {showCorrect && <span className="text-white text-sm">✓</span>}
                    {showIncorrect && <span className="text-white text-sm">✗</span>}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg animate-slide-in">
            <div className="flex gap-2 mb-2">
              <span className="text-blue-400">💡</span>
              <span className="font-semibold text-blue-400">Explication</span>
            </div>
            <p className="text-gray-300">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-casper-primary hover:bg-casper-primary/80 text-white'
              }`}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-casper-primary hover:bg-casper-primary/80 rounded-lg font-semibold transition-all"
            >
              {isLastQuestion ? 'Voir les résultats' : 'Question suivante →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
