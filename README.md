# Super Red

An endless-runner style mobile game built with Expo and React Native. Jump to dodge bombs and survive as long as you can.

## Tech Stack

- **Expo SDK 54** / React Native 0.83 / React 19
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing with typed routes)
- **React Native Reanimated** (frame-based game loop and animations)
- React Native New Architecture and React Compiler enabled

## Game Features

- Tap-to-start title screen
- One-button jump gameplay with gravity physics
- Scrolling ground and parallax background
- Randomly spaced bomb obstacles
- AABB collision detection
- Game over effects (screen shake and flash)
- Survival time display and retry

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 recommended)
- [pnpm](https://pnpm.io/)

### Install and Run

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm expo start
```

Then open the app on your preferred platform:

```bash
pnpm expo start --ios
pnpm expo start --android
pnpm expo start --web
```

## Development

### Commands

```bash
pnpm expo lint     # ESLint
pnpm format        # Biome formatter (write)
pnpm format:check  # Biome formatter (check)
```

### Project Structure

```txt
app/
  _layout.tsx       # Root Stack navigator
  index.tsx         # Title screen ("Tap to Start")
  game.tsx          # Main gameplay (game loop, physics, collision)
  game-over.tsx     # Game over screen (time display, retry)
components/game/
  character.tsx     # Player character with jump animation
  bombs.tsx         # Scrolling bomb obstacles
  ground.tsx        # Scrolling ground
  background-objects.tsx  # Parallax background decorations
constants/
  game.ts           # Game physics and dimensions
  colors.ts         # Color palette
```

### CI

Runs on every PR via GitHub Actions:

1. ESLint
2. Biome format check
3. TypeScript type check
