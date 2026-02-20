import { useSharedValue } from "react-native-reanimated";
import { GRAVITY, JUMP_VELOCITY } from "@/constants/game";
import { randomInRange } from "@/utils/random";

interface CharacterPhysicsParams {
  scrollSpeedMin: number;
  scrollSpeedMax: number;
}

export function useCharacterPhysics({
  scrollSpeedMin,
  scrollSpeedMax,
}: CharacterPhysicsParams) {
  const characterY = useSharedValue(0);
  const velocityY = useSharedValue(0);
  const isJumping = useSharedValue(false);
  const scrollSpeed = useSharedValue(
    randomInRange(scrollSpeedMin, scrollSpeedMax),
  );

  const updatePhysics = () => {
    "worklet";
    if (!isJumping.value) return;

    velocityY.value += GRAVITY;
    characterY.value += velocityY.value;

    if (characterY.value >= 0) {
      characterY.value = 0;
      velocityY.value = 0;
      isJumping.value = false;
      scrollSpeed.value = randomInRange(scrollSpeedMin, scrollSpeedMax);
    }
  };

  const handleJump = (isGameOver: boolean, isPaused: boolean) => {
    if (isGameOver) return;
    if (isPaused) return;
    if (isJumping.value) return;
    velocityY.value = JUMP_VELOCITY;
    isJumping.value = true;
  };

  return { characterY, scrollSpeed, updatePhysics, handleJump };
}
