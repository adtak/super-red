import { StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ASSETS } from "@/constants/assets";
import {
  BIRD_COUNT,
  BIRD_MAX_GAP,
  BIRD_MIN_GAP,
  BIRD_PARALLAX_FACTOR,
  BIRD_SIZE,
  BIRD_Y_POSITIONS,
  SCREEN_WIDTH,
} from "@/constants/game";
import { randomInRange } from "@/utils/random";

const { BIRDS, TOTAL_WIDTH } = (() => {
  const birds = [];
  let currentX = 0;
  for (let i = 0; i < BIRD_COUNT; i++) {
    birds.push({
      id: i,
      xOffset: currentX,
      bottom: BIRD_Y_POSITIONS[i],
    });
    const gap = randomInRange(BIRD_MIN_GAP, BIRD_MAX_GAP);
    currentX += BIRD_SIZE.width + gap;
  }
  const finalGap = randomInRange(BIRD_MIN_GAP, BIRD_MAX_GAP);
  return { BIRDS: birds, TOTAL_WIDTH: currentX + finalGap };
})();

interface BirdsProps {
  scrollX: SharedValue<number>;
}

function Bird({
  scrollX,
  xOffset,
  bottom,
}: {
  scrollX: SharedValue<number>;
  xOffset: number;
  bottom: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    let x =
      ((scrollX.value * BIRD_PARALLAX_FACTOR + xOffset) % TOTAL_WIDTH) +
      SCREEN_WIDTH;
    if (x > SCREEN_WIDTH) {
      x -= TOTAL_WIDTH;
    }
    return { transform: [{ translateX: x }] };
  });

  return (
    <Animated.Image
      source={ASSETS.bird}
      style={[styles.bird, { bottom }, animatedStyle]}
    />
  );
}

export function Birds({ scrollX }: BirdsProps) {
  return (
    <View style={styles.container}>
      {BIRDS.map((bird) => (
        <Bird
          key={bird.id}
          scrollX={scrollX}
          xOffset={bird.xOffset}
          bottom={bird.bottom}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  bird: {
    position: "absolute",
    width: BIRD_SIZE.width,
    height: BIRD_SIZE.height,
  },
});
