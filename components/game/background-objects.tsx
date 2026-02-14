import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import {
  BG_OBJECT_BASE_OFFSET,
  BG_OBJECT_BORDER_RADIUS,
  BG_OBJECT_COUNT,
  BG_OBJECT_SIZE,
  BG_OBJECT_Y_SPACING,
  GROUND_HEIGHT,
} from "@/constants/game";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TOTAL_WIDTH = SCREEN_WIDTH + BG_OBJECT_SIZE.width;

const OBJECTS = Array.from({ length: BG_OBJECT_COUNT }, (_, i) => ({
  id: i,
  xOffset: (SCREEN_WIDTH / BG_OBJECT_COUNT) * i,
  y: GROUND_HEIGHT + BG_OBJECT_BASE_OFFSET + i * BG_OBJECT_Y_SPACING,
}));

interface BackgroundObjectsProps {
  scrollX: SharedValue<number>;
}

function BackgroundObject({
  scrollX,
  xOffset,
  y,
}: {
  scrollX: SharedValue<number>;
  xOffset: number;
  y: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    let x = ((scrollX.value + xOffset) % TOTAL_WIDTH) + SCREEN_WIDTH;
    if (x > SCREEN_WIDTH) {
      x -= TOTAL_WIDTH;
    }
    return { transform: [{ translateX: x }] };
  });

  return (
    <Animated.View style={[styles.object, { bottom: y }, animatedStyle]} />
  );
}

export function BackgroundObjects({ scrollX }: BackgroundObjectsProps) {
  return (
    <View style={styles.container}>
      {OBJECTS.map((obj) => (
        <BackgroundObject
          key={obj.id}
          scrollX={scrollX}
          xOffset={obj.xOffset}
          y={obj.y}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  object: {
    position: "absolute",
    width: BG_OBJECT_SIZE.width,
    height: BG_OBJECT_SIZE.height,
    backgroundColor: Colors.bgObject,
    borderRadius: BG_OBJECT_BORDER_RADIUS,
  },
});
