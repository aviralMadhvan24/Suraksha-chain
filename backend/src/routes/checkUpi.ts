import { Request, Response } from "express";
import { checkRegistry } from "../services/registry";
import { calculateRisk } from "../services/riskEngine";
import { redis } from "../config/redis";

export async function checkUpi(req: Request, res: Response) {
  try {
    const { upiId, amount, userId } = req.body;

    if (!upiId || !userId) {
      return res.status(400).json({ error: "upiId and userId are required" });
    }

    // 1. Read recent call context from Redis
    const cachedCall = await redis.get(`call_context:${userId}`);

    let recentScamCall = false;
    let recentScamConfidence = 0;
    let recentScamType: string | undefined = undefined;

    if (cachedCall) {
      const parsed = JSON.parse(cachedCall);
      recentScamCall = parsed.scamDetected;
      recentScamConfidence = parsed.confidence;
      recentScamType = parsed.scamType;
    }

    // 2. Check fraud registry
    const registryResult = await checkRegistry(upiId);

    // 3. Calculate final risk
    const risk = calculateRisk({
      upiId,
      amount,
      isNewPayee: true,
      recentScamCall,
      recentScamConfidence,
      recentScamType,
      registryHit: registryResult.verified,
    });

    console.log("Registry result:", registryResult);
console.log("UserId:", userId);
console.log("Redis raw:", cachedCall);
console.log("Parsed call context:", {
  recentScamCall,
  recentScamConfidence,
  recentScamType
});
if (!cachedCall) {
  console.warn("⚠️ No recent call context found for user:", userId);
}

    res.json(risk);
  } catch (error) {
    console.error("checkUpi error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

