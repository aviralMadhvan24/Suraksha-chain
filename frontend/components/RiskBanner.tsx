import { View, Text } from "react-native";

type Props = {
  level: "LOW" | "MEDIUM" | "HIGH";
};

export function RiskBanner({ level }: Props) {
  const backgroundColor =
    level === "HIGH"
      ? "#dc2626"
      : level === "MEDIUM"
      ? "#f59e0b"
      : "#16a34a";

  return (
    <View
      style={{
        backgroundColor,
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
        RISK LEVEL: {level}
      </Text>
    </View>
  );
}
