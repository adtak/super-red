import { StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  BOMB_COUNT,
  BOMB_HEIGHT,
  BOMB_SIZE,
  GROUND_HEIGHT,
} from "@/constants/game";

function Bomb({
  positions,
  index,
}: {
  positions: SharedValue<number[]>;
  index: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return { transform: [{ translateX: positions.value[index] }] };
  });

  return (
    <Animated.Image
      source={require("@/assets/images/bomb.png")}
      style={[styles.bomb, animatedStyle]}
    />
  );
}

interface BombsProps {
  positions: SharedValue<number[]>;
}

export function Bombs({ positions }: BombsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: BOMB_COUNT }, (_, i) => (
        <Bomb key={i} positions={positions} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: GROUND_HEIGHT,
  },
  bomb: {
    position: "absolute",
    width: BOMB_SIZE,
    height: BOMB_HEIGHT,
    bottom: 0,
  },
});
