import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BackgroundObjects } from "@/components/game/background-objects";
import { Bombs } from "@/components/game/bombs";
import { Character } from "@/components/game/character";
import { Clouds } from "@/components/game/clouds";
import { Ground } from "@/components/game/ground";
import { Items } from "@/components/game/items";
import { GameButton } from "@/components/ui/game-button";
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
        <Clouds scrollX={scrollX} />
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
        <Ground />
      </Animated.View>

      <View style={styles.scoreBadge}>
        <AnimatedTextInput
          style={styles.scoreHud}
          editable={false}
          animatedProps={scoreProps}
          pointerEvents="none"
        />
        <Text style={styles.ptsLabel}>pts</Text>
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
        <GameButton label="RESUME" onPress={togglePause} />
        <GameButton label="TITLE" onPress={() => router.replace("/")} />
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
    flexDirection: "row",
    alignItems: "baseline",
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
    minWidth: 120,
  },
  ptsLabel: {
    ...Typography.score,
    fontSize: 20,
    color: Colors.text,
    marginLeft: 4,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.title,
  },
  pauseButtonWrapper: {
    position: "absolute",
    top: 60,
    right: 20,
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
});
