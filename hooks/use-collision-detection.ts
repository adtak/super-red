export function checkHorizontalOverlap(
  charLeft: number,
  charSize: number,
  targetX: number,
  targetSize: number,
): boolean {
  "worklet";
  return charLeft < targetX + targetSize && charLeft + charSize > targetX;
}

export function checkAABBCollision(
  charLeft: number,
  charSize: number,
  charTop: number,
  charBottom: number,
  targetX: number,
  targetSize: number,
  targetTop: number,
  targetBottom: number,
): boolean {
  "worklet";
  const horizontalOverlap = checkHorizontalOverlap(
    charLeft,
    charSize,
    targetX,
    targetSize,
  );
  const verticalOverlap = charTop < targetBottom && charBottom > targetTop;
  return horizontalOverlap && verticalOverlap;
}
