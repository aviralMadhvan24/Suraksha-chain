import { create } from "zustand";

interface RiskState {
  callContext: {
    scamDetected: boolean;
    confidence: number;
    scamType?: string;
  } | null;

  riskResult: any;

  setCallContext: (data: any) => void;
  setRiskResult: (data: any) => void;
  reset: () => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  callContext: null,
  riskResult: null,

  setCallContext: (data) =>
    set({
      callContext: {
        scamDetected: data.scamDetected,
        confidence: data.confidence,
        scamType: data.scamType,
      },
    }),

  setRiskResult: (data) =>
    set({
      riskResult: data,
    }),

  reset: () =>
    set({
      callContext: null,
      riskResult: null,
    }),
}));
