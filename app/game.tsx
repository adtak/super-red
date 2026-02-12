import { Pressable, StyleSheet, View } from "react-native";
import { useFrameCallback, useSharedValue } from "react-native-reanimated";
import { BackgroundObjects } from "@/components/game/background-objects";
import { Character } from "@/components/game/character";
import { Ground } from "@/components/game/ground";
import { Colors } from "@/constants/colors";
import {
  CHARACTER_LEFT,
  GRAVITY,
  GROUND_HEIGHT,
  JUMP_VELOCITY,
  SCROLL_SPEED,
} from "@/constants/game";

export default function Game() {
  const characterY = useSharedValue(0);
  const velocityY = useSharedValue(0);
  const isJumping = useSharedValue(false);
  const scrollX = useSharedValue(0);

  useFrameCallback(() => {
    scrollX.value -= SCROLL_SPEED;

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
    if (isJumping.value) return;
    velocityY.value = JUMP_VELOCITY;
    isJumping.value = true;
  };

  return (
    <Pressable style={styles.container} onPress={handleJump}>
      <BackgroundObjects scrollX={scrollX} />
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
