import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function Index() {
  return (
    <Pressable style={styles.container} onPress={() => router.replace("/game")}>
      <View style={styles.content}>
        <Text style={styles.title}>SUPER RED</Text>
        <Text style={styles.tapToStart}>TAP TO START</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 4,
    color: Colors.title,
  },
  tapToStart: {
    fontSize: 18,
    letterSpacing: 3,
    color: Colors.text,
    marginTop: 32,
  },
});
