import { router } from "expo-router";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import {
  FLASH_PEAK_OPACITY,
  GAME_OVER_EFFECT_FRAMES,
  SHAKE_FRAMES,
  SHAKE_INTENSITY,
} from "@/constants/game";

export function useGameOverEffect() {
  const gameOverFrame = useSharedValue(0);
  const shakeOffsetX = useSharedValue(0);
  const shakeOffsetY = useSharedValue(0);
  const flashOpacity = useSharedValue(0);

  const navigateToGameOver = (score: number) => {
    router.replace({
      pathname: "/game-over",
      params: { score: String(score) },
    });
  };

  const updateGameOverEffect = (score: number): boolean => {
    "worklet";
    gameOverFrame.value += 1;
    const frame = gameOverFrame.value;

    // Screen shake
    if (frame <= SHAKE_FRAMES) {
      shakeOffsetX.value = (Math.random() * 2 - 1) * SHAKE_INTENSITY;
      shakeOffsetY.value = (Math.random() * 2 - 1) * SHAKE_INTENSITY;
    } else {
      shakeOffsetX.value = 0;
      shakeOffsetY.value = 0;
    }

    // Screen flash
    if (frame <= 3) {
      flashOpacity.value = FLASH_PEAK_OPACITY;
    } else {
      const remaining = GAME_OVER_EFFECT_FRAMES - frame;
      const fadeRange = GAME_OVER_EFFECT_FRAMES - 3;
      flashOpacity.value = Math.max(
        0,
        FLASH_PEAK_OPACITY * (remaining / fadeRange),
      );
    }

    // Navigate after effect completes
    if (frame === GAME_OVER_EFFECT_FRAMES) {
      runOnJS(navigateToGameOver)(score);
    }

    return frame >= GAME_OVER_EFFECT_FRAMES;
  };

  return { shakeOffsetX, shakeOffsetY, flashOpacity, updateGameOverEffect };
}
