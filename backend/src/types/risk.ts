export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" ; 


export interface RiskInput {
    upiId? : string ; 
    amount? : number ; 
    isNewPayee ? : boolean ; 
    recentScamCall? : boolean ; 
    callKeywords? : string [] ; 
    registryHit? : boolean ;
}


export interface RiskResult { 
     riskScore : number ;
     riskLevel : RiskLevel ; 
     reasons : string[] ; 
     recommendedAction : "PROCEED" | "WARN" | "DELAY" ; 
}