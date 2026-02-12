import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function GameOver() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
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
  retryButton: {
    marginTop: 32,
  },
  retryText: {
    fontSize: 18,
    letterSpacing: 3,
    color: Colors.text,
  },
});
