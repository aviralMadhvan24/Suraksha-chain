import { RiskLevel, RiskInput, RiskResult } from "../types/risk";


export function calculateRisk (input : RiskInput) : RiskResult {
    let score = 0 ; 

    const reasons : string[] = [ ] ; 

      if (input.isNewPayee) {
      score += 0.2;
      reasons.push('Payment to a new recipient');
    }

      if (input.amount && input.amount > 20000) {
      score += 0.2;
      reasons.push('Unusually large payment amount');
    }
    if (input.callKeywords?.includes('CBI')) {
    score += 0.3;
    reasons.push('Authority impersonation keywords detected');
    }

    score = Math.min(score,1 ) ; 
    const riskLevel = score >=0.7 ? "HIGH" : score >=0.4 ? "MEDIUM" : "LOW" ; 
      
    const recommendedAction =
    riskLevel === 'HIGH' ? 'DELAY' :
    riskLevel === 'MEDIUM' ? 'WARN' :
    'PROCEED';
    
    if (input.registryHit) {
    score += 0.5;
    reasons.push('Recipient reported in fraud registry');
    }

     return {
    riskScore: score,
    riskLevel,
    reasons,
    recommendedAction
  };
}