import { Colors } from "@/constants/colors";
import { useHighScore } from "@/hooks/use-high-score";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GameOver() {
  const { time } = useLocalSearchParams<{ time: string }>();
  const { highScore, isNewHighScore } = useHighScore(time ?? "0");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
      {time && (
        <>
          <Text style={styles.survivedLabel}>SURVIVED</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.time}>{time}s</Text>
            {isNewHighScore && <Text style={styles.newBadge}>NEW!</Text>}
          </View>
        </>
      )}
      {highScore && (
        <>
          <Text style={styles.bestLabel}>BEST</Text>
          <Text style={styles.bestTime}>{highScore}s</Text>
        </>
      )}
      <Pressable
        style={styles.retryButton}
        onPress={() => router.replace("/game")}
      >
        <Text style={styles.retryText}>RETRY</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 4,
    color: Colors.title,
  },
  survivedLabel: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 3,
    color: Colors.text,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  time: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 2,
    color: Colors.text,
  },
  newBadge: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
    color: Colors.title,
  },
  bestLabel: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 3,
    color: Colors.text,
  },
  bestTime: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 2,
    color: Colors.text,
  },
  retryButton: {
    marginTop: 32,
  },
  retryText: {
    fontSize: 18,
    letterSpacing: 3,
    color: Colors.text,
  },
});
