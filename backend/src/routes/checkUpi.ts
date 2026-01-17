import { Request, Response } from "express";
import { checkRegistry } from "../services/registry";
import { calculateRisk } from "../services/riskEngine";

export async function checkUpi(req: Request, res: Response) {
  try {
    const { upiId, amount } = req.body;

    if (!upiId) {
      return res.status(400).json({ error: "upiId is required" });
    }

    // 1. Check fraud registry (mocked / blockchain later)
    const registryResult = await checkRegistry(upiId);

    // 2. Calculate risk using registry signal
    const risk = calculateRisk({
      upiId,
      amount,
      isNewPayee: true,
      recentScamCall: true,
      registryHit: registryResult.verified,
    });

    // 3. Return result
    res.json(risk);
  } catch (error) {
    console.error("checkUpi error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
