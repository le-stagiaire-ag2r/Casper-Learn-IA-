const fs = require('fs');
const path = require('path');

// Read modules.json
const modulesPath = path.join(__dirname, '../data/modules.json');
const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf-8'));

// Define unique badge icons for each quiz
const badgeIcons = {
  'intro-casper': '🌟',
  'accounts-keys': '🔑',
  'intro-smart-contracts': '⚙️',
  'contract-development': '💻',
  'cep18-standard': '🪙',
  'cep78-standard': '🎨',
  'staking-basics': '🔒',
  'advanced-staking': '💎'
};

// Add badgeIcon to each quiz
modules.forEach(module => {
  module.quizzes.forEach(quiz => {
    if (badgeIcons[quiz.id]) {
      quiz.badgeIcon = badgeIcons[quiz.id];
    } else {
      quiz.badgeIcon = '🏆'; // Default trophy
    }
  });
});

// Write back to file
fs.writeFileSync(modulesPath, JSON.stringify(modules, null, 2), 'utf-8');

console.log('✅ Successfully added unique badge icons to all quizzes!');
modules.forEach(module => {
  module.quizzes.forEach(quiz => {
    console.log(`  ${quiz.badgeIcon} ${quiz.id} - ${quiz.title}`);
  });
});
