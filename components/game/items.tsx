import { type ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GROUND_HEIGHT, ITEM_COUNT, ITEM_SIZE } from "@/constants/game";

const FOOD_IMAGES: ImageSourcePropType[] = [
  require("@/assets/images/food1.png"),
  require("@/assets/images/food2.png"),
  require("@/assets/images/food3.png"),
];

function Item({
  positions,
  yOffsets,
  active,
  imageIndices,
  index,
}: {
  positions: SharedValue<number[]>;
  yOffsets: SharedValue<number[]>;
  active: SharedValue<boolean[]>;
  imageIndices: SharedValue<number[]>;
  index: number;
}) {
  const animatedStyles = FOOD_IMAGES.map((_, imgIndex) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedStyle(() => {
      "worklet";
      const isVisible =
        active.value[index] && imageIndices.value[index] === imgIndex;
      return {
        opacity: isVisible ? 1 : 0,
      };
    }),
  );

  const containerStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        { translateX: positions.value[index] },
        { translateY: yOffsets.value[index] },
      ],
    };
  });

  return (
    <Animated.View style={[styles.item, containerStyle]}>
      {FOOD_IMAGES.map((source, imgIndex) => (
        <Animated.Image
          key={imgIndex}
          source={source}
          style={[styles.itemImage, animatedStyles[imgIndex]]}
        />
      ))}
    </Animated.View>
  );
}

interface ItemsProps {
  positions: SharedValue<number[]>;
  yOffsets: SharedValue<number[]>;
  active: SharedValue<boolean[]>;
  imageIndices: SharedValue<number[]>;
}

export function Items({
  positions,
  yOffsets,
  active,
  imageIndices,
}: ItemsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: ITEM_COUNT }, (_, i) => (
        <Item
          key={i}
          positions={positions}
          yOffsets={yOffsets}
          active={active}
          imageIndices={imageIndices}
          index={i}
        />
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
  item: {
    position: "absolute",
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    bottom: 0,
  },
  itemImage: {
    position: "absolute",
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
});
