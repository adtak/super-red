import { StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ASSETS } from "@/constants/assets";
import {
  GROUND_HEIGHT,
  HOUSE_COUNT,
  HOUSE_MAX_GAP,
  HOUSE_MIN_GAP,
  HOUSE_PARALLAX_FACTOR,
  HOUSE_SIZE,
  SCREEN_WIDTH,
} from "@/constants/game";
import { randomInRange } from "@/utils/random";

const { HOUSES, TOTAL_WIDTH } = (() => {
  const houses = [];
  let currentX = 0;
  for (let i = 0; i < HOUSE_COUNT; i++) {
    houses.push({
      id: i,
      xOffset: currentX,
    });
    const gap = randomInRange(HOUSE_MIN_GAP, HOUSE_MAX_GAP);
    currentX += HOUSE_SIZE.width + gap;
  }
  const finalGap = randomInRange(HOUSE_MIN_GAP, HOUSE_MAX_GAP);
  return { HOUSES: houses, TOTAL_WIDTH: currentX + finalGap };
})();

interface HousesProps {
  scrollX: SharedValue<number>;
}

function House({
  scrollX,
  xOffset,
}: {
  scrollX: SharedValue<number>;
  xOffset: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    let x =
      ((scrollX.value * HOUSE_PARALLAX_FACTOR + xOffset) % TOTAL_WIDTH) +
      SCREEN_WIDTH;
    if (x > SCREEN_WIDTH) {
      x -= TOTAL_WIDTH;
    }
    return { transform: [{ translateX: x }] };
  });

  return (
    <Animated.Image
      source={ASSETS.house}
      style={[styles.house, { bottom: GROUND_HEIGHT }, animatedStyle]}
    />
  );
}

export function Houses({ scrollX }: HousesProps) {
  return (
    <View style={styles.container}>
      {HOUSES.map((house) => (
        <House key={house.id} scrollX={scrollX} xOffset={house.xOffset} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  house: {
    position: "absolute",
    width: HOUSE_SIZE.width,
    height: HOUSE_SIZE.height,
  },
});
