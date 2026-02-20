---
title: Frequently Asked Questions
description: Common questions about Voicetree - the interactive graph-view for orchestrating coding agents. Learn about context engineering, voice mode, agent orchestration, supported coding agents, API cost reduction, and how Voicetree improves AI coding workflows.
---

## Frequently Asked Questions

### What is Voicetree?

Voicetree is an interactive graph-view where nodes are either markdown notes or terminal-based agents (Claude Code, Codex, Gemini, etc.). Agents live inside the graph next to their tasks, see nearby nodes as context, and can spawn subagents onto the graph. It's Obsidian meets Claude Code — built for efficient human-AI collaboration.

### What is context engineering?

Context engineering is designing what information AI agents see and when. In Voicetree, your knowledge lives as a graph of markdown nodes — agents see nearby nodes within a configurable radius and can semantic search local embeddings, getting only what's relevant instead of entire conversation histories. This avoids the 30–60% performance degradation from context rot.

### Can I run multiple agents at once?

Yes. Agents are spatially organized on the graph so you can track multiple agents at a glance. Agents can recursively spawn their own subagents to decompose tasks — and since subagents are native terminals, you have full transparency and control over them.

### What makes Voicetree different from other AI coding tools?

You and your agents share the same memory graph — agents see the nodes around them, avoiding context-rot. Agents can recursively spawn subagents onto the graph as native terminals, giving you full transparency and control. The spatial canvas turns overwhelming multi-agent workflows into a visual layout you can navigate at a glance.

### Is my data stored on Voicetree servers?

No — all your data is stored locally as markdown files on your device. Voice input is streamed to Soniox for real-time transcription but is not persisted. We collect anonymous usage telemetry (opt-out with `VITE_DISABLE_ANALYTICS=true`).

### What platforms does Voicetree support?

Voicetree is a desktop app available for macOS (Apple Silicon and Intel), Windows, and Linux.

### How do I get access to Voicetree?

Voicetree is in early access and free to download for macOS, Windows, and Linux. Get it from the [download page](/download) or via `brew tap voicetreelab/voicetree && brew install voicetree`. We'd love your feedback — [join our Discord](https://discord.gg/r2ZBtJ9zvk).

### Is Voicetree open source?

Voicetree is source-available on GitHub at [voicetreelab/voicetree](https://github.com/voicetreelab/voicetree) under the Business Source License 1.1 (BSL 1.1), which converts to Apache 2.0 after 4 years. The code is free for non-production use — we want developers to hack on it.

### How can I contact the Voicetree team?

Join our [Discord](https://discord.gg/r2ZBtJ9zvk) for questions and feedback, or email us at hello@voicetree.io.

### What can I use Voicetree for?

Common use cases include: orchestrating multi-file refactors across parallel agents, breaking complex features into dependency graphs that agents work through, planning architecture with voice-to-graph before delegating implementation, and building project knowledge bases that agents share. Any workflow where you need multiple agents coordinated around shared context benefits.

### What is voice mode in Voicetree?

Voice mode lets you speak your thoughts and Voicetree structures them into a graph in ~15 seconds. Speaking activates deliberate (System 2) thinking — Japanese train conductors use "point and calling" to reduce errors by 85% for the same reason. The graph holds your reasoning chain so you can go arbitrarily deep without losing track.

### How does Voicetree reduce AI API costs?

Voicetree's context engineering prunes what agents see to only nearby relevant nodes instead of full conversation histories — averaging 60% fewer input tokens per request. Focused context also improves agent accuracy by avoiding the 30–60% performance degradation caused by context rot in long prompts. Your API subscription lasts longer and works better.

### Which coding agents work with Voicetree?

Voicetree works with any terminal-based coding agent: Claude Code, OpenAI Codex, Gemini CLI, OpenCode, and others. Agents run as native terminals embedded in the graph — you keep your existing settings, configs, and workflows. Voicetree doesn't replace your agent; it gives your agent spatial context and orchestration.

### How does Voicetree help with large projects?

As projects grow, Voicetree scales by leveraging spatial memory — your brain's most efficient recall mechanism. Each node represents a concept at any abstraction level, and the graph structure mirrors your mental model. Agents decompose tasks into subgraphs, and you navigate progress like a map instead of scrolling through terminal tabs. No cold starts — return after days and instantly see where everything stands.
