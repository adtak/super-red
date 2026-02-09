# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo/React Native app (super-red) using Expo SDK 54, React 19, React Native 0.81, and TypeScript (strict mode). Package manager is **pnpm**.

Key experimental features enabled in `app.json`:

- **New Architecture** (React Native)
- **Typed Routes** (Expo Router)
- **React Compiler**

## Development Commands

```bash
# Install dependencies
pnpm install

# Start Expo development server
npx expo start

# Run on specific platforms
npx expo start --ios
npx expo start --android
npx expo start --web

# Lint
npx expo lint

# Format
pnpm format          # format all files (write)
pnpm format:check    # check formatting (CI)

# Reset project (clears template code)
node ./scripts/reset-project.js
```

## Environment

- `EXPO_DEBUG=1` is set via `.claude/settings.json`

## Architecture

### Routing (Expo Router — file-based)

Routes live in `app/`. Directory structure maps directly to URL structure.

- `app/_layout.tsx` — Root Stack with `ThemeProvider`, defines two screens: `(tabs)` and `modal`
- `app/(tabs)/_layout.tsx` — Bottom tab navigator (Home, Explore)
- `app/(tabs)/index.tsx` — Home screen
- `app/(tabs)/explore.tsx` — Explore screen
- `app/modal.tsx` — Modal screen (presented modally via Stack)

### Theme System

- Colors defined in `constants/theme.ts` — light/dark palettes
- Platform-specific font families (iOS system fonts, Android defaults, web font stacks) also in `constants/theme.ts`
- `useColorScheme()` hook returns current scheme; web version handles hydration for static rendering
- `useThemeColor(props, colorName)` hook resolves themed colors with optional per-component overrides
- `ThemedText` and `ThemedView` are the base themed primitives — use these instead of raw `Text`/`View`

### Cross-Platform Patterns

- Platform-specific files use extensions: `.ios.tsx`, `.web.ts`
- `IconSymbol` maps SF Symbols (iOS) to Material Icons (Android/web) — mapping defined in `components/ui/icon-symbol.tsx`
- `HapticTab` provides haptic feedback on tab press (iOS only)
- `ExternalLink` opens in-app browser on native, default browser on web

### Linting & Formatting

- **ESLint** (`npx expo lint`) — Linting only. Kept for Expo-specific rules and React Compiler integration
- **Biome** (`pnpm format`) — Formatter only (linter disabled in `biome.json`). Also handles import sorting
- The two tools have fully separated roles with no conflicts

### Import Aliases

Use `@/` to import from the project root (configured in `tsconfig.json`):

```typescript
import { ThemedText } from "@/components/themed-text";
```
