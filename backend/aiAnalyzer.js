import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeWithGemini(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a financial cybersecurity expert.

Analyze the following message and determine if it is a financial scam.

Return the response strictly in JSON format with:
- risk_score (0 to 100)
- risk_level ("Safe", "Suspicious", "High Risk")
- reasons (array of short bullet points)

Message:
"""
${message}
"""
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Gemini may wrap JSON in markdown, so we clean it
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
