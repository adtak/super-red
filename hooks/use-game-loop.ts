import { router } from "expo-router";
import { useRef } from "react";
import { Dimensions } from "react-native";
import {
  runOnJS,
  type SharedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import {
  BOMB_COUNT,
  BOMB_MAX_GAP,
  BOMB_MIN_GAP,
  BOMB_SIZE,
  CHARACTER_LEFT,
  CHARACTER_SIZE,
  FLASH_PEAK_OPACITY,
  GAME_OVER_EFFECT_FRAMES,
  GRAVITY,
  ITEM_COUNT,
  ITEM_MAX_GAP,
  ITEM_MIN_GAP,
  ITEM_SIZE,
  ITEM_Y_MAX,
  ITEM_Y_MIN,
  JUMP_VELOCITY,
  SCROLL_SPEED_MAX,
  SCROLL_SPEED_MIN,
  SHAKE_FRAMES,
  SHAKE_INTENSITY,
} from "@/constants/game";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function randomScrollSpeed(): number {
  "worklet";
  return (
    SCROLL_SPEED_MIN + Math.random() * (SCROLL_SPEED_MAX - SCROLL_SPEED_MIN)
  );
}

function randomItemYOffset(): number {
  "worklet";
  return ITEM_Y_MAX + Math.random() * (ITEM_Y_MIN - ITEM_Y_MAX);
}

function randomItemImageIndex(): number {
  "worklet";
  return Math.floor(Math.random() * 3);
}

interface GameLoopState {
  characterY: SharedValue<number>;
  scrollX: SharedValue<number>;
  bombPositions: SharedValue<number[]>;
  itemPositions: SharedValue<number[]>;
  itemYOffsets: SharedValue<number[]>;
  itemActive: SharedValue<boolean[]>;
  itemImageIndices: SharedValue<number[]>;
  shakeOffsetX: SharedValue<number>;
  shakeOffsetY: SharedValue<number>;
  flashOpacity: SharedValue<number>;
  handleJump: () => void;
}

export function useGameLoop(): GameLoopState {
  const characterY = useSharedValue(0);
  const velocityY = useSharedValue(0);
  const isJumping = useSharedValue(false);
  const isGameOver = useSharedValue(false);
  const scrollSpeed = useSharedValue(randomScrollSpeed());
  const scrollX = useSharedValue(0);
  const bombPositions = useSharedValue(
    Array.from(
      { length: BOMB_COUNT },
      (_, i) => SCREEN_WIDTH + BOMB_MIN_GAP * (i + 1),
    ),
  );
  const itemPositions = useSharedValue(
    Array.from(
      { length: ITEM_COUNT },
      (_, i) => SCREEN_WIDTH + ITEM_MIN_GAP * (i + 1),
    ),
  );
  const itemYOffsets = useSharedValue(
    Array.from({ length: ITEM_COUNT }, () => randomItemYOffset()),
  );
  const itemActive = useSharedValue(
    Array.from({ length: ITEM_COUNT }, () => true),
  );
  const itemImageIndices = useSharedValue(
    Array.from({ length: ITEM_COUNT }, () => randomItemImageIndex()),
  );
  const startTime = useRef(Date.now());

  const gameOverFrame = useSharedValue(0);
  const shakeOffsetX = useSharedValue(0);
  const shakeOffsetY = useSharedValue(0);
  const flashOpacity = useSharedValue(0);

  const navigateToGameOver = () => {
    const elapsedSeconds = (Date.now() - startTime.current) / 1000;
    router.replace({
      pathname: "/game-over",
      params: { time: elapsedSeconds.toFixed(1) },
    });
  };

  useFrameCallback(() => {
    if (isGameOver.value) {
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
        runOnJS(navigateToGameOver)();
      }
      return;
    }

    scrollX.value -= scrollSpeed.value;

    // Move bombs
    const positions = bombPositions.value.slice();
    for (let i = 0; i < positions.length; i++) {
      positions[i] -= scrollSpeed.value;
      if (positions[i] < -BOMB_SIZE) {
        const max = Math.max(...positions);
        const gap =
          BOMB_MIN_GAP + Math.random() * (BOMB_MAX_GAP - BOMB_MIN_GAP);
        positions[i] = max + gap;
      }
    }
    bombPositions.value = positions;

    // Move items
    const itemPos = itemPositions.value.slice();
    const itemY = itemYOffsets.value.slice();
    const active = itemActive.value.slice();
    const imageIndices = itemImageIndices.value.slice();
    for (let i = 0; i < itemPos.length; i++) {
      itemPos[i] -= scrollSpeed.value;
      if (itemPos[i] < -ITEM_SIZE) {
        const max = Math.max(...itemPos);
        const gap =
          ITEM_MIN_GAP + Math.random() * (ITEM_MAX_GAP - ITEM_MIN_GAP);
        itemPos[i] = max + gap;
        itemY[i] = randomItemYOffset();
        imageIndices[i] = randomItemImageIndex();
        active[i] = true;
      }
    }
    itemPositions.value = itemPos;
    itemYOffsets.value = itemY;
    itemImageIndices.value = imageIndices;

    // Item collision detection (AABB)
    for (let i = 0; i < itemPos.length; i++) {
      if (!active[i]) continue;
      const itemX = itemPos[i];
      const horizontalOverlap =
        CHARACTER_LEFT < itemX + ITEM_SIZE &&
        CHARACTER_LEFT + CHARACTER_SIZE > itemX;
      const itemTop = itemY[i];
      const itemBottom = itemTop + ITEM_SIZE;
      const charTop = characterY.value;
      const charBottom = charTop + CHARACTER_SIZE;
      const verticalOverlap = charTop < itemBottom && charBottom > itemTop;
      if (horizontalOverlap && verticalOverlap) {
        active[i] = false;
      }
    }
    itemActive.value = active;

    // Bomb collision detection (AABB)
    for (let i = 0; i < positions.length; i++) {
      const bombX = positions[i];
      const horizontalOverlap =
        CHARACTER_LEFT < bombX + BOMB_SIZE &&
        CHARACTER_LEFT + CHARACTER_SIZE > bombX;
      const verticalOverlap = characterY.value > -BOMB_SIZE;
      if (horizontalOverlap && verticalOverlap) {
        isGameOver.value = true;
        return;
      }
    }

    if (!isJumping.value) return;

    velocityY.value += GRAVITY;
    characterY.value += velocityY.value;

    if (characterY.value >= 0) {
      characterY.value = 0;
      velocityY.value = 0;
      isJumping.value = false;
      scrollSpeed.value = randomScrollSpeed();
    }
  });

  const handleJump = () => {
    if (isGameOver.value) return;
    if (isJumping.value) return;
    velocityY.value = JUMP_VELOCITY;
    isJumping.value = true;
  };

  return {
    characterY,
    scrollX,
    bombPositions,
    itemPositions,
    itemYOffsets,
    itemActive,
    itemImageIndices,
    shakeOffsetX,
    shakeOffsetY,
    flashOpacity,
    handleJump,
  };
}
