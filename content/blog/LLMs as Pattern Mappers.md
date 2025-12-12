---
title: "LLMs as Pattern Mappers: A Mental Model for Agentic Engineering"
description: A practical framework for understanding what LLMs can and cannot do, and how to convert hard problems into tasks they can solve reliably.
priority: 3
draft: true
---

Last month I watched an agent spend 45 minutes confidently producing garbage. The task was straightforward: investigate why Jira's performance degraded yesterday. The agent had access to logs, metrics, and code. It produced a 2000-word report with zero actionable insights.

The problem was not the tools. The problem was me expecting reasoning from a pattern completion engine.

## The Mental Model

Here is how I think about what LLMs actually do:

```
┌─────────────────────┐          ┌─────────────────────┐
│  Training Data      │          │    World Model      │
│  ~10²³ tokens       │ ──────►  │    ~10¹² params     │
└─────────────────────┘ compress └─────────────────────┘
                                          │
                                          ▼
              ┌───────────┬───────────┬─────────┐
              │ pattern_in│constraints│ context │
              └───────────┴───────────┴─────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ pattern_out │
                   └─────────────┘
```

Training data gets compressed into patterns stored in the world model. That compression ratio (10²³ down to 10¹²) matters. The model cannot store facts verbatim. It stores patterns that reconstruct likely outputs.

Next token prediction trains the model for pattern completion, not reasoning. When you give it a partial pattern it has seen variations of before, it completes it well. When you ask it to reason through genuinely novel territory, it hallucinates confidently.

**Example**: Give the model rough pseudocode for an N+1 query problem, specify Java as a constraint, provide the existing codebase as context, and it will produce a bulk-optimized solution. That pattern (N+1 -> batch query) exists in its training data millions of times.

## What LLMs Are Good At

Pattern completion within their world model works. This includes:

**Multi-step pattern mapping**. Converting specs to tests to implementation plan to code. Each step is a pattern the model has seen before. Chain them together and you get reliable results.

**Combining known patterns in novel ways**. The model has seen authentication patterns and rate limiting patterns separately. Ask it to combine them for your specific API and it will produce something reasonable.

**Code migration**. The pattern "code in framework A -> equivalent code in framework B" exists extensively in training data. Point the model at legacy code and a target framework and let it work.

Most engineering tasks reduce to pattern mapping. This is good news. It means you can get reliable results if you frame problems correctly.

**A note on Chain of Thought**: Even techniques that look like "reasoning" fit this model. Chain of Thought prompting allocates more compute to explore multiple reasoning paths during inference. It is essentially brute-force search over patterns, not genuine novel reasoning. The patterns still come from training data.

## Why LLMs Fail (Predictably)

Failures happen for specific, predictable reasons:

**Pattern not in world model or context**. The model has no pattern for your proprietary internal framework. It will produce something that looks plausible but does not work.

**Too many extrapolation steps required**. Each step away from training data compounds uncertainty. Two hops is fine. Five hops produces garbage. This is the complexity threshold problem - below it the model amazes you, above it you get pure slop.

**Hidden assumptions from inexact language**. Natural language is ambiguous. "Make this faster" could mean latency, throughput, or perceived performance. The model picks one interpretation and runs with it. If that interpretation was wrong, everything downstream fails.

**Cognitive load exceeded**. Just finding the relevant files in a large codebase can exceed 60,000 tokens. The model cannot hold all that context effectively. Performance degrades.

**Context bloat**. Related to cognitive load, but distinct. When context grows large, the model loses track of what matters. Signal drowns in noise.

## How to Work With This

The core principle: validate patterns early and constrain the problem space.

**Check the initial pattern before execution**. Before letting an agent run, ask for a high-level plan or rough pseudocode. If the initial pattern is wrong, everything downstream will be wrong too. Gaps snowball.

**Minimize hidden assumptions**. Add this to your prompts: "What would you like clarified? For each clarifying question, include your current working assumption." This surfaces misunderstandings before they compound.

**Use tests as constraint validators**. Test failures add constraints. The pattern must adapt to satisfy them. TDD works well with LLMs because each failing test narrows the solution space.

**Split large contexts with handover documents**. When a task requires more context than the model can handle effectively, decompose it. Create explicit handover documents that summarize what the previous session learned. Treat agent sessions like human shifts.

**Tiny loops with guardrails**. Do not let agents run unsupervised for hours. Small iterations with validation at each step. If you catch a pattern error on iteration 2, you save the compounding errors from iterations 3 through 50.

**Decompose before delegating**. If a problem exceeds the complexity threshold, decompose it yourself into subproblems. Do not delegate decomposition to the agent - misunderstandings will propagate. Review each subproblem plan before execution.

## The Claude Ego Spiral

A specific failure mode worth naming: the Claude ego spiral.

It happens like this. You solve a few small-medium problems with an agent. Things go well. You think "this is working, let me just have it run on autopilot." A week later you have to rollback 50 commits because your system is a mess.

The antidote is staying under the complexity threshold for each individual task. Define concrete metrics:

- Cyclomatic complexity under 10
- Nesting depth under 4 levels
- File length under 300 lines
- Function length under 30 lines

When a change would exceed these thresholds, stop and decompose further.

## Converting Hard Problems to Pattern Mapping

Back to my Jira investigation example. The agent failed because "investigate why performance degraded" is not a pattern mapping task. It requires genuine reasoning about causality in a system the model has never seen.

The fix: convert it to pattern mapping.

```
(decision patterns, data, action constraints) -> concrete pattern of tool calls
```

Instead of "investigate," provide a decision tree. "If metric X shows pattern Y, check log Z. If log Z shows pattern W, the cause is V." The agent can map those patterns to your specific data.

The investigation still happens. But you are doing the reasoning about what patterns to look for. The agent does the pattern matching against your data.

## Practical Takeaways

1. **Start documenting the conceptual patterns of your work**. What transformations do you apply repeatedly? What decision trees do you follow? These become prompts.

2. **Frame problems as pattern mapping problems**. "Write a function that does X" works better than "solve this problem." The first is pattern completion, the second requires reasoning.

3. **Never run agents without validating the plan**. High-level approach first. If that looks wrong, fix it before execution. And always have validation tools (tests, linters, type checkers) that can catch pattern errors.

4. **Use idea sparring with progressive constraints**. Start broad, add constraints incrementally, check the pattern at each step. This is how you explore solution spaces without letting the model hallucinate into nonsense.

5. **Accept the limitations**. Do not expect genuinely new or creative reasoning from these models. They complete patterns. That is powerful when used correctly and useless when misapplied.

The mental model of LLMs as pattern mappers has saved me countless hours of debugging agent failures. Most failures trace back to asking for reasoning when I should have been asking for pattern completion. Frame the problem correctly and the tools work. Frame it wrong and no amount of prompt engineering will save you.

---

*Next: [[blog/Complexity Threshold|The Complexity Threshold]] - why agents produce gold or garbage, nothing in between.*
