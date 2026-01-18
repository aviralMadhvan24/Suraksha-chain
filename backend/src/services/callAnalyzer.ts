import { isSuspiciousByHeuristics } from "./heuristicFilter";
import { analyzeCallWithGemini } from "./geminiAnalyzer";

export async function analyzeCallHybrid(transcript: string) {
  const suspicious = isSuspiciousByHeuristics(transcript);

  if (!suspicious) {
    return {
      scamDetected: false,
      scamType: null,
      confidence: 0.1,
      signals: [],
      analysisSource: "HEURISTIC_ONLY",
    };
  }

  try {
    const aiResult = await analyzeCallWithGemini(transcript);

    return {
      ...aiResult,
      analysisSource: "HYBRID_AI",
    };
  } catch (err: any) {
    
    console.error("❌ Gemini failed:", err.message);

    return {
      scamDetected: true,           
      scamType: "UNKNOWN",
      confidence: 0.7,
      signals: ["AI analysis failed, heuristic triggered"],
      analysisSource: "HEURISTIC_FALLBACK",
    };
  }
}
