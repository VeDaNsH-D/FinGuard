import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeMessage(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a financial fraud detection AI used by banks.

Tasks:
1. Detect if the message is a financial scam
2. Detect language
3. Translate to English if needed
4. Assign fraud risk score (0-100)
5. Classify as Safe / Suspicious / High Risk
6. Explain reasons clearly for a common user

Respond strictly in JSON:
{
  "language": "",
  "translated_text": "",
  "risk_score": 0,
  "risk_level": "",
  "reasons": []
}

Message:
"""
${message}
"""
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
