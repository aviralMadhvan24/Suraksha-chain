import { Request, Response } from "express";
import { analyzeCallHybrid } from "../services/callAnalyzer";
import { redis } from "../config/redis";
export async function analyzeCall(req: Request, res: Response) {
  const { transcript , userId} = req.body;

  if (!transcript || transcript.length < 10 || !userId) {
    return res.status(400).json({
      error: "Transcript is required"
    });
  }

  try {
    const result = await analyzeCallHybrid(transcript);
   await redis.set(
      `call_context:${userId}`,
      JSON.stringify({
        scamDetected: result.scamDetected,
        confidence: result.confidence,
        scamType: result.scamType,
        timestamp: Date.now()
      }),
      "EX",
      15 * 60 // 15 minutes TTL
    );

    res.json(result);
  } catch (err: any) {
    console.error("Analyze-call error:", err.message);

    res.status(500).json({
      error: err.message
    });
  }
}
