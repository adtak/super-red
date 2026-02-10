---
name: plan-issue
description: Create an implementation plan for a GitHub issue and write it to the issue description.
disable-model-invocation: true
argument-hint: [issue-number]
allowed-tools: Read, Grep, Glob, Bash(gh *), WebFetch
---

# Plan Issue

Create an implementation plan for GitHub issue #$ARGUMENTS.

## Steps

1. **Read the issue** — Run `gh issue view $ARGUMENTS` to get the issue title, body, and labels.

2. **Understand the context** — Based on the issue description, explore the codebase to understand:
   - Which files are relevant
   - Current architecture and patterns (refer to CLAUDE.md)
   - Dependencies and constraints

3. **Draft the plan** — Write a concrete implementation plan using the template in [plan-template.md](plan-template.md). The plan should be:
   - Specific enough that another developer (or Claude) can implement it without ambiguity
   - Scoped to only what the issue requires — explicitly call out what is out of scope
   - Written in English (project convention)

4. **Write to the issue** — Update the issue description with the plan using `gh issue edit $ARGUMENTS --body "<plan>"`. Use a HEREDOC for the body to preserve formatting. If the issue already has a description, preserve the existing content and append the plan below it.

## Guidelines

- Keep the plan minimal. Do not over-engineer or add unnecessary steps.
- If the issue is unclear or missing information, list your assumptions explicitly.
- Reference actual file paths discovered during exploration, not guessed paths.
- For each file change, specify whether it is Create, Modify, or Delete.
- Do not include full code in the plan — describe what changes are needed and why.
- Code snippets are acceptable when they clarify intent (e.g., type definitions, key structures).
