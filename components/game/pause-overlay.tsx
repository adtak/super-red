import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GameButton } from "@/components/ui/game-button";
import { Colors } from "@/constants/colors";
import {
  HUD_BACKGROUND_OPACITY,
  HUD_BORDER_RADIUS,
  HUD_BORDER_WIDTH,
  HUD_SIDE_PADDING,
  HUD_TOP_OFFSET,
  PAUSE_OVERLAY_BACKGROUND_OPACITY,
} from "@/constants/game";
import { Typography } from "@/constants/typography";

type PauseOverlayProps = {
  isPaused: SharedValue<boolean>;
  togglePause: () => void;
};

export function PauseOverlay({ isPaused, togglePause }: PauseOverlayProps) {
  const pauseOverlayStyle = useAnimatedStyle(() => ({
    display: isPaused.value ? "flex" : "none",
  }));

  const pauseButtonStyle = useAnimatedStyle(() => ({
    display: isPaused.value ? "none" : "flex",
  }));

  return (
    <>
      <Animated.View style={[styles.pauseButtonWrapper, pauseButtonStyle]}>
        <Pressable style={styles.pauseButton} onPress={togglePause}>
          <Text style={styles.pauseButtonText}>II</Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[styles.pauseOverlay, pauseOverlayStyle]}
        pointerEvents="auto"
      >
        <Text style={styles.pauseTitle}>PAUSED</Text>
        <GameButton label="RESUME" onPress={togglePause} />
        <GameButton label="TITLE" onPress={() => router.replace("/")} />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  pauseButtonWrapper: {
    position: "absolute",
    top: HUD_TOP_OFFSET,
    right: HUD_SIDE_PADDING,
  },
  pauseButton: {
    borderWidth: HUD_BORDER_WIDTH,
    borderColor: Colors.text,
    borderRadius: HUD_BORDER_RADIUS,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: `rgba(0, 0, 0, ${HUD_BACKGROUND_OPACITY})`,
  },
  pauseButtonText: {
    ...Typography.score,
    color: Colors.text,
    textAlign: "center",
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `rgba(0, 0, 0, ${PAUSE_OVERLAY_BACKGROUND_OPACITY})`,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseTitle: {
    ...Typography.title,
    color: Colors.title,
  },
});
