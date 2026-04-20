// services/aiService.js
// Handles all AI processing using Groq API (free tier - llama3)

const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function processTranscript(transcript) {
  const prompt = `You are an expert meeting analyst. Analyze the following meeting transcript and extract structured information.

MEETING TRANSCRIPT:
${transcript}

Return ONLY a valid JSON object (no markdown, no extra text, no backticks) with this exact structure:
{
  "summary": "A concise 3-5 sentence summary of the entire meeting",
  "key_points": ["Point 1", "Point 2", "Point 3"],
  "action_items": [
    {
      "task": "Specific task description",
      "owner": "Person responsible (or Unassigned if not mentioned)",
      "deadline": "Deadline if mentioned (or Not specified)"
    }
  ]
}

Return ONLY the raw JSON object, no markdown fences, no extra text.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2000,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  });

  const responseText = completion.choices[0].message.content.trim();

  // Strip markdown fences if model adds them
  const cleaned = responseText
    .replace(/^```json\n?/, '')
    .replace(/^```\n?/, '')
    .replace(/\n?```$/, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!parsed.summary || !parsed.key_points || !parsed.action_items) {
    throw new Error('AI response missing required fields');
  }

  return parsed;
}

module.exports = { processTranscript };