import { StyleSheet } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ASSETS } from "@/constants/assets";
import { CHARACTER_HEIGHT, CHARACTER_SIZE } from "@/constants/game";

interface CharacterProps {
  y: SharedValue<number>;
}

export function Character({ y }: CharacterProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  return (
    <Animated.Image
      source={ASSETS.character}
      style={[styles.character, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  character: {
    width: CHARACTER_SIZE,
    height: CHARACTER_HEIGHT,
  },
});
