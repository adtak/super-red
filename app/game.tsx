import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { BackgroundObjects } from "@/components/game/background-objects";
import { Bombs } from "@/components/game/bombs";
import { Character } from "@/components/game/character";
import { Ground } from "@/components/game/ground";
import { Colors } from "@/constants/colors";
import { CHARACTER_LEFT, GROUND_HEIGHT } from "@/constants/game";
import { useGameLoop } from "@/hooks/use-game-loop";

export default function Game() {
  const {
    characterY,
    scrollX,
    bombPositions,
    shakeOffsetX,
    shakeOffsetY,
    flashOpacity,
    handleJump,
  } = useGameLoop();

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeOffsetX.value },
      { translateY: shakeOffsetY.value },
    ],
  }));

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  return (
    <Pressable style={styles.container} onPress={handleJump}>
      <Animated.View style={[styles.shakeContainer, shakeStyle]}>
        <BackgroundObjects scrollX={scrollX} />
        <Bombs positions={bombPositions} />
        <View style={styles.character}>
          <Character y={characterY} />
        </View>
        <Ground scrollX={scrollX} />
      </Animated.View>
      <Animated.View
        style={[styles.flashOverlay, flashStyle]}
        pointerEvents="none"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  shakeContainer: {
    flex: 1,
  },
  character: {
    position: "absolute",
    left: CHARACTER_LEFT,
    bottom: GROUND_HEIGHT,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.title,
  },
});
