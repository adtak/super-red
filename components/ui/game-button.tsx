import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";

type GameButtonProps = {
  label: string;
  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "children" | "style">;

export function GameButton({ label, style, ...rest }: GameButtonProps) {
  return (
    <Pressable style={[styles.button, style]} {...rest}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    paddingVertical: 14,
    paddingHorizontal: 40,
    minWidth: 160,
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 8,
  },
  buttonText: {
    ...Typography.body,
    color: Colors.text,
    textAlign: "center",
  },
});
