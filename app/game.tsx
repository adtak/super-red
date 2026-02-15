import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BackgroundObjects } from "@/components/game/background-objects";
import { Bombs } from "@/components/game/bombs";
import { Character } from "@/components/game/character";
import { Ground } from "@/components/game/ground";
import { Items } from "@/components/game/items";
import { Colors } from "@/constants/colors";
import { CHARACTER_LEFT, GROUND_HEIGHT } from "@/constants/game";
import { Typography } from "@/constants/typography";
import { useGameLoop } from "@/hooks/use-game-loop";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Game() {
  const {
    characterY,
    scrollX,
    bombPositions,
    itemPositions,
    itemYOffsets,
    itemActive,
    itemImageIndices,
    itemScore,
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

  const scoreProps = useAnimatedProps(() => ({
    text: String(itemScore.value),
    defaultValue: "0",
  }));

  return (
    <Pressable style={styles.container} onPress={handleJump}>
      <Animated.View style={[styles.shakeContainer, shakeStyle]}>
        <BackgroundObjects scrollX={scrollX} />
        <Bombs positions={bombPositions} />
        <Items
          positions={itemPositions}
          yOffsets={itemYOffsets}
          active={itemActive}
          imageIndices={itemImageIndices}
        />
        <View style={styles.character}>
          <Character y={characterY} />
        </View>
        <Ground scrollX={scrollX} />
      </Animated.View>

      <AnimatedTextInput
        style={styles.scoreHud}
        editable={false}
        animatedProps={scoreProps}
        pointerEvents="none"
      />

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
  scoreHud: {
    position: "absolute",
    top: 60,
    right: 20,
    ...Typography.score,
    color: Colors.text,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.title,
  },
});
