import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { CHARACTER_SIZE } from "@/constants/game";

type CharacterProps = {
  y: SharedValue<number>;
};

export function Character({ y }: CharacterProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  return <Animated.View style={[styles.character, animatedStyle]} />;
}

const styles = {
  character: {
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
    backgroundColor: Colors.character,
    borderRadius: 4,
  },
} as const;
