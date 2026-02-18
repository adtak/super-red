---
name: agent-team-implement-issues
description: Implement multiple GitHub issues in parallel using an agent team. Each teammate implements one issue independently with its own worktree and PR.
disable-model-invocation: true
argument-hint: <issue-number> [issue-number ...]
allowed-tools: Bash(gh issue view *), TeamCreate, TeamDelete, Task, SendMessage, TaskCreate, TaskUpdate, TaskList, TaskGet
---

# Implement Issues in Parallel

Implement these GitHub Issues in parallel using an agent team: **$ARGUMENTS**

Parse `$ARGUMENTS` as space-separated issue numbers (strip any `#` prefix).

## Steps

### 1. Validate

For each issue number, run `gh issue view <number>` to confirm it exists and is open.
If any are closed or missing, warn the user and skip them. If no valid issues remain, stop.

### 2. Create a team

Call `TeamCreate` with `team_name: "implement-issues"`.

### 3. Spawn teammates in parallel

In a **single message**, spawn one teammate per valid issue using the `Task` tool:

- `subagent_type`: `"implement-issue"`  ← loads `.claude/agents/implement-issue.md`, which defines all implementation rules (worktree setup, pnpm install, lint/format/tsc checks, PR creation, worktree cleanup)
- `team_name`: `"implement-issues"`
- `name`: `"issue-<number>"`
- `prompt`: `"Implement GitHub Issue #<number>."`

### 4. Monitor

Do not implement anything yourself — stay in delegate mode.
Monitor progress via `TaskList` and incoming teammate messages.
If a teammate reports being stuck, send guidance via `SendMessage`.

### 5. Finish

After all teammates complete:

1. Summarize all PR URLs for the user
2. Send shutdown requests to all teammates via `SendMessage` (`type: "shutdown_request"`)
3. Call `TeamDelete` to clean up team resources

## Guidelines

- Spawn all teammates at once in a single parallel message to maximize throughput
- If two issues are likely to modify the same files, warn the user before spawning — parallel edits risk merge conflicts
- Never edit files or run implementation commands yourself; delegate everything to teammates
