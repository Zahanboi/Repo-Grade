import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

function safeJsonParse(text) {
  try {
    // Remove markdown code fences if present
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("AI returned invalid JSON");
  }
}

export async function generateAISummaryAndRoadmap(input) {
  const prompt = `
You are an experienced AI coding mentor.

Based ONLY on the following repository evaluation data, generate:

1. A concise 2–3 line evaluation summary.
2. A personalized improvement roadmap with:
   - Immediate Fixes
   - Skill Improvements
   - Professional Practices

Rules:
- Be specific and actionable
- Do NOT hallucinate features
- Do NOT repeat raw metrics
- Return STRICT JSON in this format:

{
  "summary": "",
  "immediate_fixes": [],
  "skill_improvements": [],
  "professional_practices": []
}

Repository Data:
${JSON.stringify(input, null, 2)}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  const rawText = response.choices[0].message.content;

  return safeJsonParse(rawText);
}
