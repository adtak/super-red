import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/colors";
import { GROUND_HEIGHT } from "@/constants/game";

export function Ground() {
  return <View style={styles.ground} />;
}

const styles = StyleSheet.create({
  ground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: GROUND_HEIGHT,
    backgroundColor: Colors.ground,
  },
});
