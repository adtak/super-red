import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useFrameCallback, useSharedValue } from "react-native-reanimated";
import { BackgroundObjects } from "@/components/game/background-objects";
import { Bombs } from "@/components/game/bombs";
import { Character } from "@/components/game/character";
import { Ground } from "@/components/game/ground";
import { Colors } from "@/constants/colors";
import {
  BOMB_COUNT,
  BOMB_MAX_GAP,
  BOMB_MIN_GAP,
  BOMB_SIZE,
  CHARACTER_LEFT,
  CHARACTER_SIZE,
  GRAVITY,
  GROUND_HEIGHT,
  JUMP_VELOCITY,
  SCROLL_SPEED,
} from "@/constants/game";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Game() {
  const characterY = useSharedValue(0);
  const velocityY = useSharedValue(0);
  const isJumping = useSharedValue(false);
  const isGameOver = useSharedValue(false);
  const scrollX = useSharedValue(0);
  const bombPositions = useSharedValue(
    Array.from(
      { length: BOMB_COUNT },
      (_, i) => SCREEN_WIDTH + BOMB_MIN_GAP * (i + 1),
    ),
  );

  useFrameCallback(() => {
    if (isGameOver.value) return;

    scrollX.value -= SCROLL_SPEED;

    // Move bombs
    const positions = bombPositions.value.slice();
    for (let i = 0; i < positions.length; i++) {
      positions[i] -= SCROLL_SPEED;
      if (positions[i] < -BOMB_SIZE) {
        const max = Math.max(...positions);
        const gap =
          BOMB_MIN_GAP + Math.random() * (BOMB_MAX_GAP - BOMB_MIN_GAP);
        positions[i] = max + gap;
      }
    }
    bombPositions.value = positions;

    // Collision detection (AABB)
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
    }
  });

  const handleJump = () => {
    if (isGameOver.value) return;
    if (isJumping.value) return;
    velocityY.value = JUMP_VELOCITY;
    isJumping.value = true;
  };

  return (
    <Pressable style={styles.container} onPress={handleJump}>
      <BackgroundObjects scrollX={scrollX} />
      <Bombs positions={bombPositions} />
      <View style={styles.character}>
        <Character y={characterY} />
      </View>
      <Ground scrollX={scrollX} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  character: {
    position: "absolute",
    left: CHARACTER_LEFT,
    bottom: GROUND_HEIGHT,
  },
});
