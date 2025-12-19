export function bankRiskCheck(riskScore) {
  if (riskScore >= 80) {
    return {
      allowTransaction: false,
      message: "Transaction blocked due to high fraud risk"
    };
  }
  if (riskScore >= 50) {
    return {
      allowTransaction: true,
      message: "Transaction allowed with warning"
    };
  }
  return {
    allowTransaction: true,
    message: "Transaction safe"
  };
}
