import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUPER RED</Text>
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
  title: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 4,
    color: Colors.title,
  },
});
