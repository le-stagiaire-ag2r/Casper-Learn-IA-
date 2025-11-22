const fs = require('fs');
const path = require('path');

// Read modules.json
const modulesPath = path.join(__dirname, '../data/modules.json');
const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf-8'));

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Randomize answers for each question
modules.forEach(module => {
  module.quizzes.forEach(quiz => {
    quiz.questions.forEach(question => {
      // Get the correct answer text
      const correctAnswerText = question.options[question.correctAnswer];

      // Shuffle the options
      question.options = shuffle(question.options);

      // Find the new index of the correct answer
      question.correctAnswer = question.options.indexOf(correctAnswerText);
    });
  });
});

// Write back to file
fs.writeFileSync(modulesPath, JSON.stringify(modules, null, 2), 'utf-8');

console.log('✅ Successfully randomized all answer positions!');
console.log('New distribution:');

// Count new distribution
const distribution = {};
modules.forEach(module => {
  module.quizzes.forEach(quiz => {
    quiz.questions.forEach(question => {
      const pos = question.correctAnswer;
      distribution[pos] = (distribution[pos] || 0) + 1;
    });
  });
});

Object.keys(distribution).sort().forEach(pos => {
  console.log(`  Position ${parseInt(pos) + 1}: ${distribution[pos]} questions`);
});
