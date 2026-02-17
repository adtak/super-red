import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { useHighScore } from "@/hooks/use-high-score";

export default function GameOver() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const { highScore, isNewHighScore } = useHighScore(score ?? "0");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
      {score && (
        <>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{score} pts</Text>
            {isNewHighScore && <Text style={styles.newBadge}>NEW!</Text>}
          </View>
        </>
      )}
      {highScore && (
        <>
          <Text style={styles.bestLabel}>BEST</Text>
          <Text style={styles.bestValue}>{highScore} pts</Text>
        </>
      )}
      <Pressable
        style={styles.retryButton}
        onPress={() => router.replace("/game")}
      >
        <Text style={styles.retryText}>RETRY</Text>
      </Pressable>
      <Pressable style={styles.retryButton} onPress={() => router.replace("/")}>
        <Text style={styles.retryText}>TITLE</Text>
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
    ...Typography.title,
    color: Colors.title,
  },
  scoreLabel: {
    ...Typography.label,
    marginTop: 40,
    color: Colors.text,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  scoreValue: {
    ...Typography.score,
    color: Colors.text,
  },
  newBadge: {
    ...Typography.label,
    fontWeight: "900",
    letterSpacing: 2,
    color: Colors.title,
  },
  bestLabel: {
    ...Typography.label,
    marginTop: 24,
    color: Colors.text,
  },
  bestValue: {
    ...Typography.score,
    marginTop: 8,
    color: Colors.text,
  },
  retryButton: {
    marginTop: 32,
  },
  retryText: {
    ...Typography.body,
    color: Colors.text,
  },
});
