import { api } from "./api";

export async function analyzeCall(
  userId: string,
  transcript: string
) {
  const res = await api.post("/analyze-call", {
    userId,
    transcript,
  });

  return res.data;
}
