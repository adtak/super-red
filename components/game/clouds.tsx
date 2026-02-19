import { StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  CLOUD_COUNT,
  CLOUD_PARALLAX_FACTOR,
  CLOUD_SIZE,
  CLOUD_Y_POSITIONS,
  SCREEN_WIDTH,
} from "@/constants/game";

const TOTAL_WIDTH = SCREEN_WIDTH + CLOUD_SIZE.width;

const CLOUDS = Array.from({ length: CLOUD_COUNT }, (_, i) => ({
  id: i,
  xOffset: (SCREEN_WIDTH / CLOUD_COUNT) * i,
  bottom: CLOUD_Y_POSITIONS[i],
}));

interface CloudsProps {
  scrollX: SharedValue<number>;
}

function Cloud({
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
      ((scrollX.value * CLOUD_PARALLAX_FACTOR + xOffset) % TOTAL_WIDTH) +
      SCREEN_WIDTH;
    if (x > SCREEN_WIDTH) {
      x -= TOTAL_WIDTH;
    }
    return { transform: [{ translateX: x }] };
  });

  return (
    <Animated.Image
      source={require("@/assets/images/cloud.png")}
      style={[styles.cloud, { bottom }, animatedStyle]}
    />
  );
}

export function Clouds({ scrollX }: CloudsProps) {
  return (
    <View style={styles.container}>
      {CLOUDS.map((cloud) => (
        <Cloud
          key={cloud.id}
          scrollX={scrollX}
          xOffset={cloud.xOffset}
          bottom={cloud.bottom}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  cloud: {
    position: "absolute",
    width: CLOUD_SIZE.width,
    height: CLOUD_SIZE.height,
  },
});
