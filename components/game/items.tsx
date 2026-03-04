import { useState } from "react";
import { type ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ASSETS } from "@/constants/assets";
import { GROUND_HEIGHT, ITEM_COUNT, ITEM_SIZE } from "@/constants/game";

const FOOD_IMAGES: ImageSourcePropType[] = [
  ASSETS.food1,
  ASSETS.food2,
  ASSETS.food3,
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
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useAnimatedReaction(
    () => ({
      isActive: active.value[index],
      imgIndex: imageIndices.value[index],
    }),
    (current, previous) => {
      if (
        current.isActive !== previous?.isActive ||
        current.imgIndex !== previous?.imgIndex
      ) {
        runOnJS(setVisible)(current.isActive ?? false);
        runOnJS(setImageIndex)(current.imgIndex ?? 0);
      }
    },
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
      {visible && (
        <Animated.Image
          source={FOOD_IMAGES[imageIndex]}
          style={styles.itemImage}
        />
      )}
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
