import { type ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ASSETS } from "@/constants/assets";
import { GROUND_HEIGHT, ITEM_COUNT, ITEM_SIZE } from "@/constants/game";

const FOOD_IMAGES: ImageSourcePropType[] = [
  ASSETS.food1,
  ASSETS.food2,
  ASSETS.food3,
];

function FoodImage({
  source,
  active,
  imageIndices,
  index,
  imgIndex,
}: {
  source: ImageSourcePropType;
  active: SharedValue<boolean[]>;
  imageIndices: SharedValue<number[]>;
  index: number;
  imgIndex: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    const isVisible =
      active.value[index] && imageIndices.value[index] === imgIndex;
    return {
      opacity: isVisible ? 1 : 0,
    };
  });

  return (
    <Animated.Image source={source} style={[styles.itemImage, animatedStyle]} />
  );
}

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
        <FoodImage
          key={imgIndex}
          source={source}
          active={active}
          imageIndices={imageIndices}
          index={index}
          imgIndex={imgIndex}
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
