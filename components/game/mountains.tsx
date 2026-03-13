import { StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ASSETS } from "@/constants/assets";
import {
  GROUND_HEIGHT,
  MOUNTAIN_COUNT,
  MOUNTAIN_MAX_GAP,
  MOUNTAIN_MIN_GAP,
  MOUNTAIN_PARALLAX_FACTOR,
  MOUNTAIN_SIZE,
  SCREEN_WIDTH,
} from "@/constants/game";
import { randomInRange } from "@/utils/random";

const { MOUNTAINS, TOTAL_WIDTH } = (() => {
  const mountains = [];
  let currentX = 0;
  for (let i = 0; i < MOUNTAIN_COUNT; i++) {
    mountains.push({
      id: i,
      xOffset: currentX,
    });
    const gap = randomInRange(MOUNTAIN_MIN_GAP, MOUNTAIN_MAX_GAP);
    currentX += MOUNTAIN_SIZE.width + gap;
  }
  const finalGap = randomInRange(MOUNTAIN_MIN_GAP, MOUNTAIN_MAX_GAP);
  return { MOUNTAINS: mountains, TOTAL_WIDTH: currentX + finalGap };
})();

interface MountainsProps {
  scrollX: SharedValue<number>;
}

function Mountain({
  scrollX,
  xOffset,
}: {
  scrollX: SharedValue<number>;
  xOffset: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    let x =
      ((scrollX.value * MOUNTAIN_PARALLAX_FACTOR + xOffset) % TOTAL_WIDTH) +
      SCREEN_WIDTH;
    if (x > SCREEN_WIDTH) {
      x -= TOTAL_WIDTH;
    }
    return { transform: [{ translateX: x }] };
  });

  return (
    <Animated.Image
      source={ASSETS.mountain}
      style={[styles.mountain, { bottom: GROUND_HEIGHT }, animatedStyle]}
    />
  );
}

export function Mountains({ scrollX }: MountainsProps) {
  return (
    <View style={styles.container}>
      {MOUNTAINS.map((mountain) => (
        <Mountain
          key={mountain.id}
          scrollX={scrollX}
          xOffset={mountain.xOffset}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mountain: {
    position: "absolute",
    width: MOUNTAIN_SIZE.width,
    height: MOUNTAIN_SIZE.height,
  },
});
