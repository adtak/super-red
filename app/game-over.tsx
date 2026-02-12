import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function GameOver() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
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
});
