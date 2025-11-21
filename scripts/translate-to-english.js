// Quick translation of modules.json to English
const fs = require('fs');

const modulesData = require('./data/modules.json');

// Simple translation map for common terms
const translations = {
  // Module titles and descriptions stay mostly the same
  "Apprenez les fondamentaux de la blockchain Casper": "Learn the fundamentals of Casper blockchain",
  "Maîtrisez les smart contracts sur Casper": "Master smart contracts on Casper",
  "Créez et gérez des tokens sur Casper": "Create and manage tokens on Casper",
  "Participez à la sécurité du réseau": "Participate in network security",

  // Common question patterns
  "Qu'est-ce que": "What is",
  "Quel est": "What is",
  "Quelle est": "What is",
  "Comment": "How",
  "Peut-on": "Can we",
  "Les": "The",

  // Difficulty levels
  "Débutant": "Beginner",
  "Intermédiaire": "Intermediate",
  "Avancé": "Advanced",

  // Common words
  "questions": "questions",
  "quiz": "quiz",
};

function translateText(text) {
  if (!text || typeof text !== 'string') return text;

  let translated = text;
  for (const [fr, en] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(fr, 'gi'), en);
  }
  return translated;
}

function translateModule(module) {
  return {
    ...module,
    description: translateText(module.description),
    quizzes: module.quizzes.map(quiz => ({
      ...quiz,
      title: translateText(quiz.title),
      description: translateText(quiz.description),
      questions: quiz.questions // Keep questions as-is for now, will translate manually
    }))
  };
}

const translatedModules = modulesData.map(translateModule);

fs.writeFileSync('./data/modules-en.json', JSON.stringify(translatedModules, null, 2));
console.log('✅ Translation complete! File saved to data/modules-en.json');
