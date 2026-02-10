import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function Game() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 24,
    color: Colors.text,
  },
});
