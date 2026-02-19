import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;

export const CHARACTER_SIZE = 50;
export const CHARACTER_HEIGHT = 73;
export const GROUND_HEIGHT = 350;
export const CHARACTER_LEFT = 50;

export const JUMP_VELOCITY = -30;
export const GRAVITY = 0.8;

export const SCROLL_SPEED_MIN = 3;
export const SCROLL_SPEED_MAX = 5;
export const BG_OBJECT_COUNT = 4;
export const BG_OBJECT_SIZE = { width: 20, height: 20 };
export const BG_OBJECT_BASE_OFFSET = 40;
export const BG_OBJECT_Y_SPACING = 50;
export const BG_OBJECT_BORDER_RADIUS = 4;

export const BOMB_SIZE = 40;
export const BOMB_HEIGHT = 60;
export const BOMB_COUNT = 3;
export const BOMB_MIN_GAP = 300;
export const BOMB_MAX_GAP = 600;

export const ITEM_SIZE = 50;
export const ITEM_COUNT = 2;
export const ITEM_MIN_GAP = 400;
export const ITEM_MAX_GAP = 800;
export const ITEM_Y_MIN = -200;
export const ITEM_Y_MAX = -400;

export const GAME_OVER_EFFECT_FRAMES = 30;
export const SHAKE_FRAMES = 20;
export const SHAKE_INTENSITY = 10;
export const FLASH_HOLD_FRAMES = 3;
export const FLASH_PEAK_OPACITY = 0.6;

export const FOOD_IMAGE_COUNT = 3;
