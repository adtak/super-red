# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

- Conversation with the user: **Japanese**
- Git commit messages, PR titles/descriptions, code comments, CLAUDE.md, and other project artifacts: **English**

## Project Overview

Expo/React Native app (super-red) — an endless-runner style mobile game. Built with Expo SDK 54, React 19, React Native 0.81, and TypeScript (strict mode). Package manager is **pnpm**.

Key experimental features enabled in `app.json`:

- **New Architecture** (React Native)
- **Typed Routes** (Expo Router)
- **React Compiler**

## Development Commands

Always use **pnpm** to run Expo CLI commands (not npx).

```bash
# Install dependencies
pnpm install

# Start Expo development server
pnpm expo start

# Run on specific platforms
pnpm expo start --ios
pnpm expo start --android
pnpm expo start --web

# Lint
pnpm expo lint

# Format
pnpm format          # format all files (write)
pnpm format:check    # check formatting (CI)

# Regenerate Expo Router typed routes
# Run this after adding/removing/renaming route files in app/
pnpm expo export --platform web
```

## Environment

- `EXPO_DEBUG=1` is set via `.claude/settings.json`

## Architecture

### Routing (Expo Router — file-based)

Routes live in `app/`. Directory structure maps directly to URL structure.

- `app/_layout.tsx` — Root Stack navigator (headerless)
- `app/index.tsx` — Title screen ("Tap to Start")
- `app/game.tsx` — Main gameplay (game loop, physics, collision detection)
- `app/game-over.tsx` — Game over screen (score, high score, retry)

### Game Architecture

- **Game loop**: `hooks/use-game-loop.ts` drives frame-based updates via React Native Reanimated
- **Physics**: `hooks/use-character-physics.ts` handles jump and gravity
- **Obstacles & Items**: `hooks/use-bombs.ts` and `hooks/use-items.ts` manage spawning and scrolling
- **Collision**: `utils/collision.ts` provides AABB collision detection
- **Components**: `components/game/` contains all visual game elements (character, bombs, items, ground, clouds, mountains, houses, birds, pause overlay, score badge)
- **Assets**: Image references centralized in `constants/assets.ts`
- **Styling**: Colors in `constants/colors.ts`, typography in `constants/typography.ts`, game dimensions/physics in `constants/game.ts`

### Linting & Formatting

- **ESLint** (`pnpm expo lint`) — Linting only. Kept for Expo-specific rules and React Compiler integration
- **Biome** (`pnpm format`) — Formatting and import sorting via `biome check` (linter disabled in `biome.json`)
- The two tools have fully separated roles with no conflicts

### Import Aliases

Use `@/` to import from the project root (configured in `tsconfig.json`):

```typescript
import { ThemedText } from "@/components/themed-text";
```

## Git Workflow

### Branching Strategy

- **main** — production branch. Never commit directly to main.
- **Always** create a feature branch from `main` for every change — even if the work depends on an unmerged branch.
- Branch names: kebab-case, descriptive (e.g., `add-user-profile`, `fix-tab-navigation`).
- After work is complete, open a PR to merge back into `main`.

### Commits

- Keep commits small and focused — each commit should represent a single logical change.
- Do not bundle unrelated changes into one commit.

### Before Pushing

Run these checks locally — they also run in CI on every PR:

```bash
pnpm expo lint         # ESLint
pnpm format:check      # Biome format check
pnpm tsc --noEmit      # TypeScript type check
```
