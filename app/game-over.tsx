import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function GameOver() {
  const { time } = useLocalSearchParams<{ time: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
      {time && <Text style={styles.time}>{time}s</Text>}
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
  time: {
    marginTop: 16,
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
