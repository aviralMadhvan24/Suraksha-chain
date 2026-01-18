export function isSuspiciousByHeuristics(transcript: string): boolean {
  const text = transcript.toLowerCase();

  const authorityKeywords = [
    "cbi",
    "police",
    "court",
    "cyber crime",
    "income tax",
    "rbi"
  ];

  const threatKeywords = [
    "arrest",
    "frozen",
    "blocked",
    "legal action",
    "case"
  ];

  const urgencyKeywords = [
    "pay now",
    "immediately",
    "within",
    "urgent",
    "right now"
  ];

  let authority = authorityKeywords.some(k => text.includes(k));
  let threat = threatKeywords.some(k => text.includes(k));
  let urgency = urgencyKeywords.some(k => text.includes(k));

  // Strong heuristic condition
  return authority && (threat || urgency);
}
