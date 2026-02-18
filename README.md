# Super Red

An endless-runner style mobile game built with Expo and React Native. Jump to dodge bombs, collect items, and aim for a high score.

## Tech Stack

- **Expo SDK 54** / React Native 0.81 / React 19
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing with typed routes)
- **React Native Reanimated** (frame-based game loop and animations)
- React Native New Architecture and React Compiler enabled

## Game Features

- Tap-to-start title screen
- One-button jump gameplay with gravity physics
- Scrolling ground and parallax background
- Randomly spaced bomb obstacles
- Collectible items for scoring
- AABB collision detection
- Game over effects (screen shake and flash)
- Item-based scoring with high score tracking
- Retry from game over screen

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
pnpm format        # Biome format + import sorting (write)
pnpm format:check  # Biome format + import sorting (check)
```

### Project Structure

```txt
app/
  _layout.tsx       # Root Stack navigator
  index.tsx         # Title screen ("Tap to Start")
  game.tsx          # Main gameplay (game loop, physics, collision)
  game-over.tsx     # Game over screen (score, high score, retry)
components/game/
  character.tsx     # Player character with jump animation
  bombs.tsx         # Scrolling bomb obstacles
  items.tsx         # Collectible items
  ground.tsx        # Scrolling ground
  background-objects.tsx  # Parallax background decorations
hooks/
  use-game-loop.ts  # Frame-based game loop hook
  use-high-score.ts # AsyncStorage-backed high score persistence
constants/
  game.ts           # Game physics and dimensions
  colors.ts         # Color palette
  typography.ts     # Font families and text styles
```

### CI

Runs on every PR via GitHub Actions:

1. ESLint
2. Biome format check
3. TypeScript type check

## Claude Code

This project includes [Claude Code](https://claude.ai/code) skills and agents for AI-assisted development.

### Skills (slash commands)

Run these from the Claude Code CLI prompt:

| Command | Description |
| --- | --- |
| `/plan-issue <number>` | Analyze codebase context and write a concrete implementation plan into the GitHub issue description |
| `/plan-refactor` | Scan the codebase for refactoring opportunities, present proposals for approval, then file a GitHub issue for each |
| `/implement-issue <number>` | Delegate to the `implement-issue` agent, which reads the issue, creates a git worktree on a new branch, implements the changes, runs lint/format/tsc checks, commits, and opens a PR |
| `/agent-team-implement-issues <num> [num ...]` | Implement multiple issues in parallel — spawns one agent per issue, each working in its own worktree |

### Agents

Custom agents live in `.claude/agents/`. They are invoked by skills and are not intended to be called directly.

| Agent | Description |
| --- | --- |
| `implement-issue` | Feature implementation specialist — handles the full cycle from reading an issue to opening a PR |

### Typical workflow

```txt
# 1. Plan: write an implementation plan into the issue
/plan-issue 42

# 2. Implement: create a branch, implement, and open a PR
/implement-issue 42

# 3. (Optional) Implement multiple issues at once
/agent-team-implement-issues 42 43 44
```
