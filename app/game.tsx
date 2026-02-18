import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
    isPaused,
    handleJump,
    togglePause,
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

  const pauseOverlayStyle = useAnimatedStyle(() => ({
    display: isPaused.value ? "flex" : "none",
  }));

  const pauseButtonStyle = useAnimatedStyle(() => ({
    display: isPaused.value ? "none" : "flex",
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

      <View style={styles.scoreBadge}>
        <AnimatedTextInput
          style={styles.scoreHud}
          editable={false}
          animatedProps={scoreProps}
          pointerEvents="none"
        />
      </View>

      <Animated.View
        style={[styles.flashOverlay, flashStyle]}
        pointerEvents="none"
      />

      {/* Pause button (top-right corner) */}
      <Animated.View style={[styles.pauseButtonWrapper, pauseButtonStyle]}>
        <Pressable style={styles.pauseButton} onPress={togglePause}>
          <Text style={styles.pauseButtonText}>II</Text>
        </Pressable>
      </Animated.View>

      {/* Pause overlay */}
      <Animated.View
        style={[styles.pauseOverlay, pauseOverlayStyle]}
        pointerEvents="auto"
      >
        <Text style={styles.pauseTitle}>PAUSED</Text>
        <Pressable style={styles.pauseMenuButton} onPress={togglePause}>
          <Text style={styles.pauseMenuButtonText}>RESUME</Text>
        </Pressable>
        <Pressable
          style={styles.pauseMenuButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.pauseMenuButtonText}>TITLE</Text>
        </Pressable>
      </Animated.View>
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
  scoreBadge: {
    position: "absolute",
    top: 60,
    left: 20,
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  scoreHud: {
    ...Typography.score,
    color: Colors.text,
    textAlign: "center",
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.title,
  },
  pauseButtonWrapper: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  pauseButton: {
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  pauseButtonText: {
    ...Typography.score,
    color: Colors.text,
    textAlign: "center",
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  pauseTitle: {
    ...Typography.title,
    color: Colors.title,
  },
  pauseMenuButton: {
    marginTop: 32,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
  },
  pauseMenuButtonText: {
    ...Typography.body,
    color: Colors.text,
  },
});
