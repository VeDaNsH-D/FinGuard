import axios from "axios";

const HF_MODEL =
  "https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-sms-spam-detection";

export async function analyzeMessageAI(message) {
  const response = await axios.post(
    HF_MODEL,
    { inputs: message },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const prediction = response.data[0];

  const spamScore = prediction.find(p => p.label === "spam")?.score || 0;
  const hamScore = prediction.find(p => p.label === "ham")?.score || 0;

  const riskScore = Math.round(spamScore * 100);

  let level = "Safe";
  if (riskScore > 75) level = "High Risk";
  else if (riskScore > 40) level = "Suspicious";

  return {
    score: riskScore,
    level,
    aiConfidence: spamScore.toFixed(2),
    explanation: generateExplanation(message)
  };
}

function generateExplanation(text) {
  const reasons = [];

  if (/http|www\./i.test(text)) reasons.push("Contains external links");
  if (/urgent|immediately|blocked|suspended/i.test(text))
    reasons.push("Uses urgency or fear tactics");
  if (/otp|pin|password|cvv/i.test(text))
    reasons.push("Requests sensitive credentials");
  if (/bank|upi|account|kyc/i.test(text))
    reasons.push("Impersonates financial institution");

  return reasons.length
    ? reasons
    : ["Message structure matches known scam patterns"];
}
