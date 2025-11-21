'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'Casper Interactive Learning',
    'header.subtitle': 'Learn Casper blockchain interactively',

    // Home page
    'home.welcome': 'Welcome to Casper Learning',
    'home.description': 'Learn Casper blockchain interactively with quizzes and practical exercises',
    'home.stats.progress': 'Progress',
    'home.stats.average': 'Average Score',
    'home.stats.modules': 'Modules',
    'home.modules.title': 'Learning Modules',
    'home.cta.title': 'Ready to start?',
    'home.cta.description': 'Choose a module above and start your learning journey!',
    'home.cta.features': '✓ Interactive quizzes • ✓ Instant feedback • ✓ Progress tracking',

    // Module page
    'module.back': 'Back to modules',
    'module.quizzes': 'Available quizzes',
    'module.quiz': 'quiz',
    'module.quizzes_plural': 'quizzes',
    'module.completed': 'completed',
    'module.beginner': 'Beginner',
    'module.intermediate': 'Intermediate',
    'module.advanced': 'Advanced',
    'module.questions': 'questions',
    'module.min': 'min',

    // Quiz page
    'quiz.back': 'Back',
    'quiz.question': 'Question',
    'quiz.validate': 'Validate',
    'quiz.next': 'Next question',
    'quiz.results': 'See results',
    'quiz.explanation': 'Explanation',

    // Quiz results
    'results.title': 'Quiz Complete!',
    'results.correct': 'correct answers',
    'results.excellent': 'Excellent work! 🎉',
    'results.good': 'Good job! Keep it up! 💪',
    'results.keep_learning': 'Keep learning! 📖',
    'results.back_module': 'Back to module',
    'results.retry': 'Try again',

    // Footer
    'footer.made': 'Made with ❤️ for the Casper community',
    'footer.tagline': 'Learn, Practice, Master Casper Blockchain',
  },
  fr: {
    // Header
    'header.title': 'Casper Interactive Learning',
    'header.subtitle': 'Apprenez la blockchain Casper de manière interactive',

    // Home page
    'home.welcome': 'Bienvenue sur Casper Learning',
    'home.description': 'Apprenez la blockchain Casper de manière interactive avec des quiz et des exercices pratiques',
    'home.stats.progress': 'Progression',
    'home.stats.average': 'Score Moyen',
    'home.stats.modules': 'Modules',
    'home.modules.title': 'Modules d\'apprentissage',
    'home.cta.title': 'Prêt à commencer ?',
    'home.cta.description': 'Choisissez un module ci-dessus et commencez votre apprentissage !',
    'home.cta.features': '✓ Quiz interactifs • ✓ Feedback instantané • ✓ Progression sauvegardée',

    // Module page
    'module.back': 'Retour aux modules',
    'module.quizzes': 'Quiz disponibles',
    'module.quiz': 'quiz',
    'module.quizzes_plural': 'quiz',
    'module.completed': 'complété',
    'module.beginner': 'Débutant',
    'module.intermediate': 'Intermédiaire',
    'module.advanced': 'Avancé',
    'module.questions': 'questions',
    'module.min': 'min',

    // Quiz page
    'quiz.back': 'Retour',
    'quiz.question': 'Question',
    'quiz.validate': 'Valider',
    'quiz.next': 'Question suivante',
    'quiz.results': 'Voir les résultats',
    'quiz.explanation': 'Explication',

    // Quiz results
    'results.title': 'Quiz Terminé !',
    'results.correct': 'réponses correctes',
    'results.excellent': 'Excellent travail ! 🎉',
    'results.good': 'Bon travail ! Continuez comme ça ! 💪',
    'results.keep_learning': 'Continuez à apprendre ! 📖',
    'results.back_module': 'Retour au module',
    'results.retry': 'Recommencer',

    // Footer
    'footer.made': 'Made with ❤️ for the Casper community',
    'footer.tagline': 'Learn, Practice, Master Casper Blockchain',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('casper-learning-language') as Language;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('casper-learning-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
