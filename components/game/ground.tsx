import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { GROUND_HEIGHT, GROUND_MARKER_GAP } from "@/constants/game";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MARKER_COUNT = Math.ceil(SCREEN_WIDTH / GROUND_MARKER_GAP) + 1;

function buildMarkers() {
  const markers = [];
  for (let i = 0; i < MARKER_COUNT * 2; i++) {
    markers.push(
      <View key={i} style={[styles.marker, { left: i * GROUND_MARKER_GAP }]} />,
    );
  }
  return markers;
}

interface GroundProps {
  scrollX: SharedValue<number>;
}

export function Ground({ scrollX }: GroundProps) {
  const markersStyle = useAnimatedStyle(() => {
    "worklet";
    const offset = scrollX.value % (MARKER_COUNT * GROUND_MARKER_GAP);
    return { transform: [{ translateX: offset }] };
  });

  return (
    <View style={styles.ground}>
      <Animated.View style={[styles.markersContainer, markersStyle]}>
        {buildMarkers()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  ground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: GROUND_HEIGHT,
    backgroundColor: Colors.ground,
    overflow: "hidden",
  },
  markersContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    flexDirection: "row",
  },
  marker: {
    position: "absolute",
    top: GROUND_HEIGHT / 2 - 1,
    width: 12,
    height: 2,
    backgroundColor: Colors.groundMarker,
  },
});
