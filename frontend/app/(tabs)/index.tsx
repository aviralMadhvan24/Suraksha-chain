import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Suraksha Chain</Text>
        <Text style={styles.subtitle}>
          Real-time scam detection before money moves
        </Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start Protection</Text>
        <Text style={styles.cardDesc}>
          Analyze suspicious calls and prevent fraudulent UPI payments in real
          time.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => router.push("/analyze-call")}
        >
          <Text style={styles.primaryButtonText}>
            Analyze Scam Call
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Privacy-first • No audio stored • No PII persisted
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // dark navy
    padding: 24,
    justifyContent: "space-between",
  },

  header: {
    marginTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f8fafc",
  },

  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 8,
  },

  cardDesc: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 20,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#64748b",
    marginBottom: 10,
  },
});
