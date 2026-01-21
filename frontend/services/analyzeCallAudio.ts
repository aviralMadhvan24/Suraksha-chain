import { api } from "./api";

export async function analyzeCallAudio(
  userId: string,
  file: any
) {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("audio", {
    uri: file.uri,
    name: file.name || "call-audio.m4a",
    type: file.mimeType || "audio/m4a",
  } as any);

  const res = await api.post("/analyze-call-audio", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
