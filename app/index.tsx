import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";

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
    ...Typography.title,
    color: Colors.title,
  },
  tapToStart: {
    ...Typography.body,
    color: Colors.text,
    marginTop: 32,
  },
});
