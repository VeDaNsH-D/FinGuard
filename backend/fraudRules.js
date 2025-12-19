function analyzeMessage(text) {
  const lowerText = text.toLowerCase();
  let score = 0;
  let reasons = [];

  // Urgency words
  const urgencyWords = ["urgent", "immediately", "blocked", "suspended", "24 hours", "verify now"];
  urgencyWords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 15;
      reasons.push("Uses urgency or fear-based language");
    }
  });

  // Sensitive info request
  const sensitiveWords = ["otp", "pin", "password", "cvv", "account details"];
  sensitiveWords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 30;
      reasons.push("Requests sensitive information");
    }
  });

  // Suspicious links
  if (lowerText.includes("http://") || lowerText.includes("https://")) {
    score += 20;
    reasons.push("Contains a clickable link");
  }

  // Fake brand impersonation
  const brands = ["sbi", "hdfc", "icici", "axis", "paytm", "phonepe", "google pay"];
  brands.forEach(brand => {
    if (lowerText.includes(brand)) {
      score += 10;
      reasons.push(`Impersonates trusted brand (${brand.toUpperCase()})`);
    }
  });

  // Cap score at 100
  score = Math.min(score, 100);

  // Risk level
  let level = "Safe";
  if (score >= 70) level = "High Risk";
  else if (score >= 40) level = "Suspicious";

  return {
    score,
    level,
    reasons: [...new Set(reasons)] // remove duplicates
  };
}

module.exports = { analyzeMessage };
