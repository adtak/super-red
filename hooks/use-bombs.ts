import { Dimensions } from "react-native";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import {
  BOMB_COUNT,
  BOMB_MAX_GAP,
  BOMB_MIN_GAP,
  BOMB_SIZE,
  BOMB_Y_BOTTOM,
  BOMB_Y_TOP,
  CHARACTER_LEFT,
  CHARACTER_SIZE,
} from "@/constants/game";
import { checkAABBCollision } from "@/utils/collision";
import { randomInRange } from "@/utils/random";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function useBombs() {
  const bombPositions = useSharedValue(
    Array.from(
      { length: BOMB_COUNT },
      (_, i) => SCREEN_WIDTH + BOMB_MIN_GAP * (i + 1),
    ),
  );

  const updateBombs = (
    scrollSpeed: SharedValue<number>,
    characterY: SharedValue<number>,
  ): boolean => {
    "worklet";
    const positions = bombPositions.value.slice();
    for (let i = 0; i < positions.length; i++) {
      positions[i] -= scrollSpeed.value;
      if (positions[i] < -BOMB_SIZE) {
        const max = Math.max(...positions);
        const gap = randomInRange(BOMB_MIN_GAP, BOMB_MAX_GAP);
        positions[i] = max + gap;
      }
    }
    bombPositions.value = positions;

    // Bomb collision detection (AABB)
    for (let i = 0; i < positions.length; i++) {
      const hit = checkAABBCollision(
        CHARACTER_LEFT,
        CHARACTER_SIZE,
        characterY.value,
        characterY.value + CHARACTER_SIZE,
        positions[i],
        BOMB_SIZE,
        BOMB_Y_TOP,
        BOMB_Y_BOTTOM,
      );
      if (hit) {
        return true;
      }
    }
    return false;
  };

  return { bombPositions, updateBombs };
}
