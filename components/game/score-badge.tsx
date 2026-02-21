import { StyleSheet, Text, TextInput } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import {
  HUD_BACKGROUND_OPACITY,
  HUD_BORDER_RADIUS,
  HUD_BORDER_WIDTH,
  HUD_SIDE_PADDING,
  HUD_TOP_OFFSET,
} from "@/constants/game";
import { Typography } from "@/constants/typography";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type ScoreBadgeProps = {
  score: SharedValue<number>;
};

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const scoreProps = useAnimatedProps(() => ({
    text: String(score.value),
    defaultValue: "0",
  }));

  return (
    <Animated.View style={styles.scoreBadge}>
      <AnimatedTextInput
        style={styles.scoreHud}
        editable={false}
        animatedProps={scoreProps}
        pointerEvents="none"
      />
      <Text style={styles.ptsLabel}>pts</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scoreBadge: {
    position: "absolute",
    top: HUD_TOP_OFFSET,
    left: HUD_SIDE_PADDING,
    flexDirection: "row",
    alignItems: "baseline",
    borderWidth: HUD_BORDER_WIDTH,
    borderColor: Colors.text,
    borderRadius: HUD_BORDER_RADIUS,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: `rgba(0, 0, 0, ${HUD_BACKGROUND_OPACITY})`,
  },
  scoreHud: {
    ...Typography.score,
    color: Colors.text,
    textAlign: "center",
    minWidth: 120,
  },
  ptsLabel: {
    ...Typography.score,
    fontSize: 20,
    color: Colors.text,
    marginLeft: 4,
  },
});
