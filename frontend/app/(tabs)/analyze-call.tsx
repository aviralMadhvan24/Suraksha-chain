import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

import { analyzeCall } from "../../services/analyzeCall";
import { analyzeCallAudio } from "../../services/analyzeCallAudio";
import { useRiskStore } from "../../store/riskStore";

export default function AnalyzeCallScreen() {
  const [transcript, setTranscript] = useState("");
  const [audioFile, setAudioFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const setCallContext = useRiskStore((s) => s.setCallContext);


  const pickAudioFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setAudioFile(result.assets[0]);
      setTranscript(""); 
    }
  };


  const handleAnalyzeText = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    try {
      const data = await analyzeCall("u1", transcript);
      setCallContext(data);

      if (Platform.OS === "web") {
        window.alert(
          `${data.scamDetected ? "Scam Detected" : "No Scam Detected"}\nConfidence: ${Math.round(
            data.confidence * 100
          )}%`
        );
      }

      router.push("/check-upi");
    } finally {
      setLoading(false);
    }
  };


  const handleAnalyzeAudio = async () => {
    if (!audioFile) return;

    setLoading(true);
    try {
      const data = await analyzeCallAudio("u1", audioFile);
      setCallContext(data);
      router.push("/check-upi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <Text style={styles.title}>Analyze Suspicious Call</Text>
        <Text style={styles.subtitle}>
          Upload a call recording or paste what the caller said.
        </Text>
      </View>

  
      <View style={styles.card}>
        {/* Audio upload */}
        <Text style={styles.label}>Upload Call Recording (optional)</Text>

        <Pressable style={styles.uploadButton} onPress={pickAudioFile}>
          <Text style={styles.uploadText}>
            {audioFile ? "Change Audio File" : "Upload Audio (.mp3 / .m4a)"}
          </Text>
        </Pressable>

        {audioFile && (
          <Text style={styles.fileName}>Selected: {audioFile.name}</Text>
        )}

        <Text style={styles.orText}>OR</Text>

      
        <Text style={styles.label}>Paste Call Transcript</Text>

        <TextInput
          value={transcript}
          onChangeText={setTranscript}
          placeholder="This is CBI. Your account will be frozen unless you pay now..."
          placeholderTextColor="#64748b"
          multiline
          style={styles.input}
        />

        <Pressable
          style={[
            styles.button,
            loading && { opacity: 0.6 },
            !audioFile && !transcript.trim() && { opacity: 0.4 },
          ]}
          disabled={loading || (!audioFile && !transcript.trim())}
          onPress={audioFile ? handleAnalyzeAudio : handleAnalyzeText}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Analyze Call</Text>
          )}
        </Pressable>
      </View>

      <Text style={styles.footer}>
        Upload only recordings you own or have consent to share
      </Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 24,
    justifyContent: "space-between",
  },

  header: {
    marginTop: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
  },

  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 8,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#cbd5f5",
    marginBottom: 8,
  },

  uploadButton: {
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#020617",
  },

  uploadText: {
    color: "#93c5fd",
    fontSize: 14,
    fontWeight: "600",
  },

  fileName: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 12,
  },

  orText: {
    textAlign: "center",
    color: "#64748b",
    marginVertical: 10,
    fontSize: 12,
  },

  input: {
    height: 120,
    textAlignVertical: "top",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
    padding: 14,
    color: "#e5e7eb",
    marginBottom: 16,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
});
