---
title: "The Complexity Threshold: Why Your AI Agent Produces Gold or Garbage"
description: LLMs have a sharp complexity threshold - below it they produce magic, above it pure slop. Learn to recognize the "Claude ego spiral" anti-pattern and use practical complexity budgeting to keep your AI agents productive.
priority: 4
---

Last month I watched 50 commits roll in while I made dinner. Claude was crushing it on a refactor I'd been dreading. Two days later, I rolled back every single one.

The code compiled. Tests passed. But the system had become an unmaintainable mess of abstractions, edge cases, and "clever" solutions to problems that didn't exist. I'd fallen into what I now call the **Claude ego spiral** - and if you've used coding agents for more than a week, you've probably been there too.

## The Complexity Threshold

LLMs have a sharp complexity threshold. Below it, they amaze you with elegant solutions. Above it, they produce pure slop. There's no graceful degradation - just a cliff.

Half the battle is recognizing this limit exists. The other half is not getting carried away after a few small wins. The pattern is predictable:

1. Claude solves a small problem brilliantly
2. You think "this is amazing, let me try something bigger"
3. You let it run on autopilot
4. A week later you're rolling back 50 commits

If a problem is too complex, decompose it yourself into sub-problems. Don't delegate decomposition to the same agent that will execute - misunderstandings from the parent task will propagate if you don't review carefully.

## Pre and Post Implementation Checkpoints

Before writing any code, ask Claude to provide:

```
Before implementing [feature], provide:
1. The simplest possible approach
2. What complexity it adds to the system
3. Whether existing code can be reused/modified instead
4. If we can achieve 80% of the value with 20% of the complexity
```

For post-implementation review, use a fresh session. The same session that wrote the code will have ownership bias - it'll defend its own decisions rather than critique them.

## Concrete Complexity Metrics

Establish measurable criteria and automate them:

- **Cyclomatic complexity**: Keep functions under 10, ideally under 5
- **Nesting depth**: Maximum 3 levels
- **File length**: Cap at 200-300 lines
- **Function length**: Target 20-30 lines
- **Dependencies**: Track import count and module coupling

Set these as automated checks. When complexity exceeds thresholds, tests should fail.

**Tools that help:**
- [ESLint complexity rule](https://eslint.org/docs/latest/rules/complexity) - fails on cyclomatic complexity
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - comprehensive code quality metrics
- `eslint-plugin-sonarjs` - cognitive complexity checks
- `radon` (Python) or `plato` (JS) for complexity reports

## Complexity Budgeting

Track complexity like technical debt:

```
Current complexity score: X
This change adds: Y complexity points
Total would be: X+Y
Is this worth it? What can we remove to stay under budget?
```

This gives Claude a concrete constraint to reason with, rather than vague instructions to "keep it simple."

## The "Explain to a Junior" Test

Periodically ask:

```
Explain how [component/feature] works as if to a junior developer.
If the explanation is complex, suggest how to simplify the actual code.
```

If Claude can't explain it simply, the code is too complex.

## Refactoring Triggers

Set specific thresholds that trigger simplification:

- Function grows beyond 30 lines
- File exceeds 300 lines
- More than 3 levels of nesting
- Adding a 4th parameter to a function

## Default to Deletion

Before adding features, ask:

```
Before adding [feature]:
1. What existing code could we delete instead?
2. What features are unused or rarely used?
3. Can we solve this by removing complexity elsewhere?
```

## The Bottom Line

Most problems with agentic coding come from not accepting these limitations. The goal isn't zero complexity, but ensuring every bit of complexity earns its place in your system.

Make these checks habitual. Create a checklist for every coding session. The agents are powerful - but only when you keep them under the complexity threshold.

---

*Related: [[LLMs as Pattern Mappers]] - the mental model that explains why complexity thresholds exist.*
