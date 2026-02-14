import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { useHighScore } from "@/hooks/use-high-score";

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
    ...Typography.title,
    color: Colors.title,
  },
  survivedLabel: {
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
  time: {
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
  bestTime: {
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
