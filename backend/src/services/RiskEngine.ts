import { RiskLevel, RiskInput, RiskResult } from "../types/risk";

export function calculateRisk(input: RiskInput): RiskResult {
  let score = 0;
  const reasons: string[] = [];

 
  if (input.isNewPayee) {
    score += 0.2;
    reasons.push("Payment to a new recipient");
  }

  if (input.amount && input.amount > 20000) {
    score += 0.2;
    reasons.push("Unusually large payment amount");
  }

  
  if (input.recentScamCall && input.recentScamConfidence && input.recentScamConfidence > 0.7) {
    score += 0.5;
    reasons.push(`Recent ${input.recentScamType} scam call detected`);
  }

  
  if (input.registryHit) {
    score += 0.5;
    reasons.push("Recipient reported in fraud registry");
  }

  
  score = Math.min(score, 1);

  
  let riskLevel: RiskLevel = "LOW";
  let recommendedAction: "PROCEED" | "WARN" | "DELAY" = "PROCEED";

  if (score >= 0.7) {
    riskLevel = "HIGH";
    recommendedAction = "DELAY";
  } else if (score >= 0.4) {
    riskLevel = "MEDIUM";
    recommendedAction = "WARN";
  }

  return {
    riskScore: score,
    riskLevel,
    reasons,
    recommendedAction
  };
}
