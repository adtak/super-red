import { Dimensions } from "react-native";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import {
  CHARACTER_LEFT,
  CHARACTER_SIZE,
  FOOD_IMAGE_COUNT,
  ITEM_COUNT,
  ITEM_MAX_GAP,
  ITEM_MIN_GAP,
  ITEM_SIZE,
  ITEM_Y_MAX,
  ITEM_Y_MIN,
} from "@/constants/game";
import { checkAABBCollision } from "@/hooks/use-collision-detection";
import { randomInRange, randomInt } from "@/utils/random";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function useItems() {
  const itemPositions = useSharedValue(
    Array.from(
      { length: ITEM_COUNT },
      (_, i) => SCREEN_WIDTH + ITEM_MIN_GAP * (i + 1),
    ),
  );
  const itemYOffsets = useSharedValue(
    Array.from({ length: ITEM_COUNT }, () =>
      randomInRange(ITEM_Y_MAX, ITEM_Y_MIN),
    ),
  );
  const itemActive = useSharedValue(
    Array.from({ length: ITEM_COUNT }, () => true),
  );
  const itemImageIndices = useSharedValue(
    Array.from({ length: ITEM_COUNT }, () => randomInt(FOOD_IMAGE_COUNT)),
  );
  const itemScore = useSharedValue(0);

  const updateItems = (
    scrollSpeed: SharedValue<number>,
    characterY: SharedValue<number>,
  ) => {
    "worklet";
    const itemPos = itemPositions.value.slice();
    const itemY = itemYOffsets.value.slice();
    const active = itemActive.value.slice();
    const imageIndices = itemImageIndices.value.slice();

    for (let i = 0; i < itemPos.length; i++) {
      itemPos[i] -= scrollSpeed.value;
      if (itemPos[i] < -ITEM_SIZE) {
        const max = Math.max(...itemPos);
        const gap = randomInRange(ITEM_MIN_GAP, ITEM_MAX_GAP);
        itemPos[i] = max + gap;
        itemY[i] = randomInRange(ITEM_Y_MAX, ITEM_Y_MIN);
        imageIndices[i] = randomInt(FOOD_IMAGE_COUNT);
        active[i] = true;
      }
    }
    itemPositions.value = itemPos;
    itemYOffsets.value = itemY;
    itemImageIndices.value = imageIndices;

    // Item collision detection (AABB)
    for (let i = 0; i < itemPos.length; i++) {
      if (!active[i]) continue;
      const hit = checkAABBCollision(
        CHARACTER_LEFT,
        CHARACTER_SIZE,
        characterY.value,
        characterY.value + CHARACTER_SIZE,
        itemPos[i],
        ITEM_SIZE,
        itemY[i],
        itemY[i] + ITEM_SIZE,
      );
      if (hit) {
        active[i] = false;
        itemScore.value += 1;
      }
    }
    itemActive.value = active;
  };

  return {
    itemPositions,
    itemYOffsets,
    itemActive,
    itemImageIndices,
    itemScore,
    updateItems,
  };
}
