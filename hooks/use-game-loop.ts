import {
  type SharedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import { SCROLL_SPEED_MAX, SCROLL_SPEED_MIN } from "@/constants/game";
import { useBombs } from "@/hooks/use-bombs";
import { useCharacterPhysics } from "@/hooks/use-character-physics";
import { useGameOverEffect } from "@/hooks/use-game-over-effect";
import { useItems } from "@/hooks/use-items";

interface GameLoopState {
  characterY: SharedValue<number>;
  scrollX: SharedValue<number>;
  bombPositions: SharedValue<number[]>;
  itemPositions: SharedValue<number[]>;
  itemYOffsets: SharedValue<number[]>;
  itemActive: SharedValue<boolean[]>;
  itemImageIndices: SharedValue<number[]>;
  itemScore: SharedValue<number>;
  shakeOffsetX: SharedValue<number>;
  shakeOffsetY: SharedValue<number>;
  flashOpacity: SharedValue<number>;
  isPaused: SharedValue<boolean>;
  handleJump: () => void;
  togglePause: () => void;
}

export function useGameLoop(): GameLoopState {
  const isGameOver = useSharedValue(false);
  const isPaused = useSharedValue(false);
  const scrollX = useSharedValue(0);

  const { characterY, scrollSpeed, updatePhysics, handleJump } =
    useCharacterPhysics({
      scrollSpeedMin: SCROLL_SPEED_MIN,
      scrollSpeedMax: SCROLL_SPEED_MAX,
    });
  const { bombPositions, updateBombs } = useBombs();
  const {
    itemPositions,
    itemYOffsets,
    itemActive,
    itemImageIndices,
    itemScore,
    updateItems,
  } = useItems();
  const { shakeOffsetX, shakeOffsetY, flashOpacity, updateGameOverEffect } =
    useGameOverEffect();

  useFrameCallback(() => {
    if (isGameOver.value) {
      updateGameOverEffect(itemScore.value);
      return;
    }

    if (isPaused.value) return;

    scrollX.value -= scrollSpeed.value;

    const hit = updateBombs(scrollSpeed, characterY);
    if (hit) {
      isGameOver.value = true;
      return;
    }

    updateItems(scrollSpeed, characterY);
    updatePhysics();
  });

  return {
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
    handleJump: () => handleJump(isGameOver.value, isPaused.value),
    togglePause: () => {
      if (isGameOver.value) return;
      isPaused.value = !isPaused.value;
    },
  };
}
