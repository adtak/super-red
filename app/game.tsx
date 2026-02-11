import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Character } from "@/components/game/character";
import { Ground } from "@/components/game/ground";
import { Colors } from "@/constants/colors";
import { CHARACTER_LEFT, GROUND_HEIGHT } from "@/constants/game";

export default function Game() {
  const characterY = useSharedValue(0);

  return (
    <View style={styles.container}>
      <View style={styles.character}>
        <Character y={characterY} />
      </View>
      <Ground />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  character: {
    position: "absolute",
    left: CHARACTER_LEFT,
    bottom: GROUND_HEIGHT,
  },
});
