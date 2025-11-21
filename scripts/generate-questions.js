#!/usr/bin/env node

/**
 * Script to generate quiz questions from Casper documentation
 * Uses Groq API to generate high-quality questions based on real docs
 */

const https = require('https');
const fs = require('fs');

// Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const CASPER_DOCS_URLS = [
  'https://docs.casper.network/concepts/',
  'https://docs.casper.network/developers/',
  'https://docs.casper.network/users/',
  'https://docs.casper.network/resources/',
];

// Fetch content from URL
function fetchContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

// Generate questions using Groq API
async function generateQuestions(content, topic) {
  const prompt = `Based on this Casper blockchain documentation content, generate 5 quiz questions in JSON format.

Content:
${content.substring(0, 3000)}

Generate questions following this exact JSON structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "The question text in French",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation in French",
      "difficulty": "beginner"
    }
  ]
}

Requirements:
- Questions and explanations in French
- 4 options per question
- correctAnswer is index (0-3)
- difficulty: "beginner", "intermediate", or "advanced"
- Cover important concepts from the content
- Make questions educational and clear

Return ONLY valid JSON, no markdown or extra text.`;

  const requestData = JSON.stringify({
    model: 'llama-3.1-70b-versatile',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 2000
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Length': requestData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.choices && response.choices[0]) {
            const content = response.choices[0].message.content;
            // Try to parse JSON from response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const questions = JSON.parse(jsonMatch[0]);
              resolve(questions.questions || []);
            } else {
              resolve([]);
            }
          } else {
            reject(new Error('Invalid API response'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(requestData);
    req.end();
  });
}

// Main function
async function main() {
  console.log('🚀 Starting Casper documentation quiz generator...\n');

  if (!GROQ_API_KEY) {
    console.error('❌ Error: GROQ_API_KEY environment variable not set');
    console.log('Get your free API key at: https://console.groq.com/');
    process.exit(1);
  }

  const modules = [
    {
      id: 'casper-basics',
      title: 'Casper Basics',
      description: 'Apprenez les fondamentaux de la blockchain Casper',
      icon: '📚',
      order: 1,
      quizzes: []
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      description: 'Maîtrisez les smart contracts sur Casper',
      icon: '⚙️',
      order: 2,
      quizzes: []
    },
    {
      id: 'tokens-nfts',
      title: 'Tokens & NFTs',
      description: 'Créez et gérez des tokens sur Casper',
      icon: '🪙',
      order: 3,
      quizzes: []
    },
    {
      id: 'staking',
      title: 'Staking & Délégation',
      description: 'Participez à la sécurité du réseau',
      icon: '🔒',
      order: 4,
      quizzes: []
    }
  ];

  try {
    console.log('📥 Fetching Casper documentation...');

    for (const url of CASPER_DOCS_URLS) {
      console.log(`  Fetching: ${url}`);
      const content = await fetchContent(url);

      // Extract text content (simple HTML stripping)
      const textContent = content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (textContent.length < 100) continue;

      console.log(`  ✓ Fetched ${textContent.length} characters`);

      // Determine topic based on URL
      let topic = 'general';
      if (url.includes('concepts')) topic = 'casper-basics';
      else if (url.includes('developers')) topic = 'smart-contracts';
      else if (url.includes('users')) topic = 'tokens-nfts';
      else if (url.includes('resources')) topic = 'staking';

      console.log(`  🤖 Generating questions for: ${topic}...`);

      try {
        const questions = await generateQuestions(textContent, topic);

        if (questions && questions.length > 0) {
          const module = modules.find(m => m.id === topic);
          if (module) {
            module.quizzes.push({
              id: `quiz-${topic}-${Date.now()}`,
              title: `Quiz ${module.title}`,
              description: `Questions basées sur la documentation officielle`,
              category: module.title,
              difficulty: 'intermediate',
              estimatedTime: 5,
              questions: questions
            });
            console.log(`  ✓ Generated ${questions.length} questions`);
          }
        }

        // Wait a bit to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`  ⚠️  Error generating questions: ${error.message}`);
      }
    }

    // Save to file
    const outputPath = './data/modules.json';
    fs.writeFileSync(outputPath, JSON.stringify(modules, null, 2));

    const totalQuestions = modules.reduce((sum, m) =>
      sum + m.quizzes.reduce((qSum, q) => qSum + q.questions.length, 0), 0
    );

    console.log('\n✅ Quiz generation complete!');
    console.log(`📊 Total questions generated: ${totalQuestions}`);
    console.log(`💾 Saved to: ${outputPath}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run
main();
