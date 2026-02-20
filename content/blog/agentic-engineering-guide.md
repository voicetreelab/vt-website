---
title: "Agentic Engineering Guide: Talk, Plan, Decompose, Review"
description: "18 months and 990k LOC of agentic development distilled into a practical engineering loop. Inspired by Japanese train drivers' Point & Call method and functional programming's type-first design."
priority: 4
---

I learnt from Japanese train drivers how to not become a lazy agentic engineer, and consistently produce clean code and architecture with low agent failure rates.

People often become LESS productive when using coding agents. They offload their cognition completely to the agents. It is too easy to see what they do, and tell them it is broken. A day or two of this mindset and architecture gets dirty. Then you spend an equivalent amount of time cleaning up the debt.

## The Core Loop: Talk, Brainstorm, Plan, Decompose, Review

### Why Talking Matters

Talking activates System 2 thinking. It prevents "AI autopilot mode." When you explain out loud the shape of your solution, without AI feeding you, you are forced to actually think.

This is how Japan ensured an insanely low error rate for their train system. **Point and Call.** Drivers physically point at signals and call out what they see. It sounds unnecessary. It looks a bit silly. But it works, because it forces conscious attention.

It is uncomfortable. It has to be uncomfortable. Your brain does not want to think deeply if it does not have to, because it uses a lot of energy.

### Agents Map Your Patterns, You Create Them

Once you have landed on a high level pattern of a solution that is sound, this is when agents come in. LLMs map between representations amazingly well. From a high level explanation in English to the representation of that in code is nothing for them.

But creating that idea from scratch? They will struggle if the idea is genuinely novel. Many problems are already in the training data. But the important problems require your thinking.

(See [[blog/llms-as-pattern-mappers|LLMs as Pattern Mappers]] for the full mental model.)

## The Loop in Practice

1. **Talk about your task.** Describe it. You will face the first challenge: the problem description that you thought you had a sharp understanding of, you can only describe quite vaguely. This is good. Try to define it from first principles.

2. **Create a mindmap** to explore the different branches of thinking. What can the solution look like? Use agents for research and codebase exploration (that is pattern mapping). But do NOT jump into solutioning yet.

3. **Get a high level plan yourself first.** If you ask for a plan prematurely it will be subtly wrong and you will spend more time reprompting. Having your own plan makes it much easier to spot where your approach and Claude's are colliding.

4. **Decompose the plan** into five stages.

## Types-First Decomposition

Get Claude to decompose the plan into these stages, in order:

**1. Data model first** because it is the core logic of any system. Problems here cascade. This needs to be transparent. Review it carefully. It is usually tiny, a few lines, but it shapes everything.

**2. Pure logic second** because these are the interactions between modules and functions. The architecture. The DSL. This is where you want your attention.

**3. Edge logic third** because this is where tech debt creeps in. Minimize interactions with the outside world. Scrutinize these boundaries.

**4. UI components fourth** to reduce complexity for the LLM. Agents can create UI components in isolation easily. They can take screenshots, ensure the design is good. As long as you are not forcing them to also make it work with everything else at the same time.

**5. Integration last** because here you want E2E testing that ensures your original specs work from a user's perspective.

## Why Each Stage Matters

Whatever you are building does something. That something can be considered a function that takes some input and produces some output or side effect. The inputs and outputs have a shape. That structure being made explicit, and being well mapped into your code's data structures is of utmost importance.

A pure function is perfectly described ONLY by its name, input type, and output type. There are no side effects, it does nothing else. The name and types are a compression of EVERYTHING the function does.

This comes from the ideas of domain-driven design, specifically from the book "Functional Design and Architecture" by Alexander Granin. It is even more important with coding agents, because agents read text. With typed languages, a function includes its descriptive name, input type, and output type all in one line.

(For how this applies to frontend specifically, see [[blog/functional-architecture-for-agentic-frontend|Functional Architecture for Agentic Frontends]].)

## The Uncomfortable Truth

Agents make it easier to be lazy, not harder. Point and talk. Force yourself to think first. Then let the agents do what they are actually good at.

Within all of this, you can do TDD, spec-driven development, all the good stuff. But those alone are not enough. You need to think first. The discipline of talking through your problem, creating the high-level pattern yourself, and then having agents execute against that pattern is what makes the difference between 400 lines of robust code and 800 lines that fail for three iterations.

---

*Originally discussed on [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qthtij/18_months_990k_loc_later_heres_my_agentic/) (56K views).*

*Related: [[blog/llms-as-pattern-mappers|LLMs as Pattern Mappers]] and [[blog/complexity-threshold|The Complexity Threshold]].*
