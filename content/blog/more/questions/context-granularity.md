---
title: How granular should context be structured for AI agents?
description: Context should be structured at the cognitive level humans can hold in working memory (5-8 items). Learn when information deserves its own node.
tags:
  - context-engineering
  - granularity
  - cognitive-science
---

## How granular should context be structured for AI agents?

Context should be structured at the cognitive level humans can hold in working memory: **5-8 items** (based on Miller's "Magical Number Seven" research).

### When Information Becomes Its Own Node

A piece of information is worthy of becoming its own work item when it represents an abstraction that aligns with the user's currently required working level of abstraction.

### The Compressibility Test

Use this test to validate granularity: After proposing a split, create a short descriptive title (3-7 words) for each new node that encapsulates all its children.

**If you cannot create a concise and accurate title, the abstraction is incorrect** and should be reverted or restructured.

### Common Patterns

Good context structure follows these patterns:
- **Problem/Solution** - problem as parent, solution as child
- **Goal/Steps** - high-level goal with sequence of tasks
- **Claim/Evidence** - insight with supporting observations

### Semantic Entropy

A node with multiple unrelated topics has high "semantic entropy." Good context engineering minimizes entropy by grouping theme-related content together.

**Related:** [[90-percent-token-reduction]]
