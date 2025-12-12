---
title: What is semantic entropy in context engineering?
description: Semantic entropy measures topical disorder within a context node. Good context engineering minimizes entropy by grouping theme-related content together.
tags:
  - context-engineering
  - information-theory
  - organization
---

## What is semantic entropy in context engineering?

Semantic entropy measures **topical disorder** within a context node.

### High vs Low Entropy

- **High entropy**: A node with 5 different unrelated topics mixed together
- **Low entropy**: A node focused on a single coherent theme

### Why Entropy Matters

High-entropy context confuses both humans and AI:
- Harder to understand what the node is "about"
- AI may focus on irrelevant parts
- Relationships to other nodes become unclear
- Compression quality degrades

### Minimizing Entropy

Good context engineering minimizes entropy by:

1. **Identifying core themes** - What distinct topics exist in this content?
2. **Proposing splits** - Group theme-related fragments together
3. **Validating with the Compressibility Test** - Can each new node get a clear 3-7 word title?

### Example

**Before (high entropy):**
> "Notes from Meeting" containing UI redesign discussion, database performance issues, and Q4 hiring plans

**After (low entropy):**
- "UI Redesign Discussion" - all UI-related content
- "Database Performance Issues" - all perf-related content
- "Q4 Hiring Plans" - all hiring-related content

Each node is now focused and useful.

**Related:** [[90-percent-token-reduction]]
