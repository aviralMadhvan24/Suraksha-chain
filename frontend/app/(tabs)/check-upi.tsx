import { View, Text, Button, Modal, Platform } from "react-native";
import { useState } from "react";
import { checkUpi } from "../../services/checkUpi";
import { useRiskStore } from "../../store/riskStore";
import { RiskBanner } from "../../components/RiskBanner";

export default function CheckUpiScreen() {
  const callContext = useRiskStore((s) => s.callContext);
  const riskResult = useRiskStore((s) => s.riskResult);
  const setRiskResult = useRiskStore((s) => s.setRiskResult);

  const [blocked, setBlocked] = useState(false);

  const handleCheck = async () => {
    const data = await checkUpi("u1", "random@upi", 5000);
    setRiskResult(data);

    if (data.riskLevel === "HIGH") {
      setBlocked(true);
    }
  };

  return (
    <View style={{ padding: 24 }}>
      {riskResult && <RiskBanner level={riskResult.riskLevel} />}

      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Simulated UPI Payment
      </Text>

      {callContext?.scamDetected && (
        <Text style={{ color: "red", marginVertical: 8 }}>
          ⚠ Recent scam call detected (15-min memory active)
        </Text>
      )}

      <Button title="Attempt Payment" onPress={handleCheck} />

      {riskResult && !blocked && (
        <Text style={{ marginTop: 20, color: "green" }}>
          ✅ Payment Allowed (Low / Medium Risk)
        </Text>
      )}

      {/* BLOCKING MODAL */}
      <Modal visible={blocked} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 10,
              width: "85%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: "red" }}>
              🚫 Payment Blocked
            </Text>

            <Text style={{ marginTop: 12 }}>
              High fraud risk detected due to recent scam activity.
            </Text>

            <Text style={{ marginTop: 10, fontWeight: "600" }}>
              Reasons:
            </Text>

            {riskResult?.reasons.map((r: string, i: number) => (
              <Text key={i}>• {r}</Text>
            ))}

            <Button title="Go Back" onPress={() => setBlocked(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
