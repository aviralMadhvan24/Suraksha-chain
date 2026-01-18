import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey.length < 10) {
  throw new Error("❌ GEMINI_API_KEY is missing or invalid");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeCallWithGemini(transcript: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const prompt = `
You are a fraud detection system.

Analyze the phone call transcript below and respond ONLY in JSON.

Classify:
- scamDetected: true/false
- scamType: DIGITAL_ARREST | LOAN | INVESTMENT | OTHER | NONE
- confidence: number between 0 and 1
- signals: list of manipulation techniques used

Transcript:
"${transcript}"
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  console.log("===== GEMINI RAW RESPONSE =====");
  console.log(text);
  console.log("===== END =====");
  return JSON.parse(text);
}
