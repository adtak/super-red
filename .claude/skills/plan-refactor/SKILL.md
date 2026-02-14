---
name: plan-refactor
description: Analyze the codebase for refactoring opportunities, create a plan, and file GitHub issues for each proposal.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(gh *), Bash(wc *), Bash(pnpm tsc --noEmit), Bash(pnpm expo lint), Bash(pnpm format:check)
---

# Plan Refactor

Analyze the codebase for refactoring opportunities, present a plan to the user, and create GitHub issues for each approved proposal.

## Steps

### 1. Analyze the codebase

Explore the codebase to identify refactoring opportunities. Focus on:

- **Large files** — Files that mix multiple concerns and could benefit from extraction (hooks, utilities, constants)
- **Duplication** — Repeated styles, logic, or patterns across files
- **Inconsistency** — Style definitions, naming conventions, or patterns that differ from the rest of the codebase
- **Magic numbers** — Hardcoded values that should be named constants
- **Dead code** — Unused imports, variables, or exports

Use the project's CLAUDE.md to understand conventions and architecture.

### 2. Draft the refactoring plan

Write a refactoring plan using the template in [refactor-template.md](refactor-template.md). For each proposal:

- Be specific about which files and lines are affected
- Describe what changes concretely (not just "refactor this")
- Include code snippets when they clarify the target structure
- Explain the benefit (separation of concerns, reduced duplication, consistency, etc.)
- Keep proposals independent — each should be implementable on its own

### 3. Present to the user

Show the full plan to the user and ask for approval. The user may:
- Approve all proposals
- Remove or modify specific proposals
- Ask for additional analysis

Do NOT proceed to issue creation until the user explicitly approves.

### 4. Create GitHub issues

For each approved proposal, create a separate GitHub issue using `gh issue create`. Each issue should contain:

- **Title** — Short, imperative, in English (e.g., "Extract game loop logic into a custom hook")
- **Body** — Structured with:
  - `## Context` — Current state and why the change is needed
  - `## Proposed Changes` — Concrete list of changes, with code snippets if helpful
  - `## Expected Outcome` — Benefits of the change
  - `## Files to Change` — Table of affected files and what changes

Use a HEREDOC for the issue body to preserve formatting.

### 5. Report results

After all issues are created, show the user a summary table with issue numbers, titles, and URLs.

## Guidelines

- Write all issue content in English (project convention).
- Converse with the user in Japanese (project convention).
- Keep proposals minimal and focused — one concern per issue.
- Do not propose changes that add complexity without clear benefit.
- Reference actual file paths and line numbers discovered during exploration.
- Proposals should be independent so they can be implemented in any order.
