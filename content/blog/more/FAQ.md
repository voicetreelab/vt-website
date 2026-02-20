---
title: Frequently Asked Questions
description: Common questions about Voicetree - the interactive graph-view for orchestrating coding agents. Learn about context engineering, voice mode, agent orchestration, supported coding agents, API cost reduction, and how Voicetree improves AI coding workflows.
---

### What is Voicetree?

Voicetree is an interactive graph-view that externalizes your short-term memory into a spatial canvas — like an automated Obsidian for AI-assisted engineering. Nodes are either markdown notes or terminal-based agents (Claude Code, Codex, Gemini, etc.). Agents live inside the graph next to their tasks, see nearby nodes as context, and can spawn subagents onto the graph. You brainstorm, plan, and execute with coding agents all in the same space, so it's easy to keep track of the state of various branches of work.

### Is Voicetree an Obsidian plugin?

Voicetree started as an Obsidian plugin ([agent-canvas](https://github.com/voicetreelab/agent-canvas)) but hit technical limitations with the plugin ecosystem — particularly around voice-to-graph mode. It's now a standalone Electron app that opens your existing Obsidian vaults directly. Your markdown files stay the same; Voicetree just gives you an interactive graph workspace on top of them.

### Can I use Voicetree without AI?

Yes — AI is completely optional and off by default. You can use Voicetree purely as a graph-based workspace for editing markdown and organizing your notes visually. AI features (voice mode, agent launching, semantic search) only activate when you explicitly use them. If you don't have a coding agent installed, those features simply aren't available.

### What is context engineering?

Context engineering is designing what information AI agents see and when. In Voicetree, your knowledge lives as a graph of markdown nodes — agents see nearby nodes within a configurable radius (a slider from 1 to 10+ hops, where each hop branches out to all connected nodes — so 5 hops can cover hundreds of nodes). Agents can also semantic search local embeddings. They get only what's relevant instead of entire conversation histories, avoiding the 30–60% performance degradation from context rot.

### Can I run multiple agents at once?

Yes. Agents are spatially organized on the graph so you can track multiple agents at a glance. Agents can recursively spawn their own subagents to decompose tasks — and since subagents are native terminals, you have full transparency and control over them.

### How are subagents validated?

The parent agent reviews each subagent's work. If completely satisfied, it closes the subagent. If there are any issues or tech debt, it leaves the subagent open as a terminal so you can click to navigate to it, see its progress nodes, and redirect it with a sentence or two of guidance. This keeps the human in the loop without requiring you to monitor every step.

### What makes Voicetree different from other AI coding tools?

You and your agents share the same memory graph — agents see the nodes around them, avoiding context-rot. Agents can recursively spawn subagents onto the graph as native terminals, giving you full transparency and control. The spatial canvas turns overwhelming multi-agent workflows into a visual layout you can navigate at a glance.

### How does Voicetree compare to alternatives like Gas Town or GSD?

Voicetree shares a similar vision with tools like Gas Town (agent swarm orchestration) but focuses on transparency and human-in-the-loop control. Gas Town's approach lacked visibility into what subagents were doing and didn't leverage spatial organization. Compared to workflow tools like GSD or Ralph Wiggum loops, Voicetree provides the visual layer on top — you can see the graph of agent progress, navigate between agents spatially, and redirect them when they drift, rather than running agents blindly in the background.

### Is my data stored on Voicetree servers?

No — all your data is stored locally as markdown files on your device. Voice input is streamed to Soniox for real-time transcription but is not persisted. Vector embeddings are stored on-device via ChromaDB next to your markdown files. We collect anonymous usage telemetry (opt-out with `VITE_DISABLE_ANALYTICS=true`).

### What platforms does Voicetree support?

Voicetree is a desktop app available for macOS (Apple Silicon and Intel), Windows, and Linux.

### How do I get access to Voicetree?

Voicetree is in early access and free to download for macOS, Windows, and Linux. Get it from the [download page](/download) or via `brew tap voicetreelab/voicetree && brew install voicetree`. We'd love your feedback — [join our Discord](https://discord.gg/r2ZBtJ9zvk).

### Is Voicetree open source?

Yes, fully open source on GitHub at [voicetreelab/voicetree](https://github.com/voicetreelab/voicetree). We want developers to hack on it and contribute. The license is BSL 1.1 (converts to Apache 2.0 after 4 years), free for non-production use.

### How can I contact the Voicetree team?

Join our [Discord](https://discord.gg/r2ZBtJ9zvk) for questions and feedback, or email us at hello@voicetree.io.

### What can I use Voicetree for?

The core workflow loop: brainstorm a large task in the mindmap — get AI to review and suggest options — execute agents on branches of the brainstorm — for harder parts, let agents decompose recursively into subgraph agents — rotate between idle agents (Cmd+\[) to check progress and nudge them — zoom out to see the big picture and identify bottlenecks. This works for multi-file refactors, complex features, architecture planning with voice-to-graph, and building project knowledge bases that agents share.

### What has been built with Voicetree?

Voicetree was used to build a performance engineering investigation agent framework at Atlassian that went into production for millions of users and saved millions in AWS costs. Voicetree itself was also built using Voicetree — the architecture is designed in the graph, then agents implement the functions.

### What is voice mode in Voicetree?

Voice mode lets you speak your thoughts and Voicetree structures them into a graph in ~15 seconds. Speaking activates deliberate (System 2) thinking — Japanese train conductors use "point and calling" to reduce errors by 85% for the same reason. The graph holds your reasoning chain so you can go arbitrarily deep without losing track.

### Does voice mode support multiple languages?

Yes — voice mode supports all major languages. Voicetree preserves your original language in the markdown output.

### How does Voicetree reduce AI API costs?

Voicetree's context engineering prunes what agents see to only nearby relevant nodes instead of full conversation histories — averaging 60% fewer input tokens per request. Additionally, running many focused short sessions uses fewer total tokens than one long session, because each follow-up in a long session resends ALL accumulated context to the model. Focused context also improves agent accuracy by avoiding the 30–60% performance degradation caused by context rot. Your API subscription lasts longer and works better.

### Which coding agents work with Voicetree?

Voicetree works with any terminal-based coding agent: Claude Code, OpenAI Codex, Gemini CLI, OpenCode, and others. You can also add any CLI command as an "agent" via the settings editor — if it runs in a terminal, it works in Voicetree. Agents run as native terminals embedded in the graph — you keep your existing settings, configs, and workflows.

### How does Voicetree help with large projects?

As projects grow, Voicetree scales by leveraging spatial memory — your brain's most efficient recall mechanism. Each node represents a concept at any abstraction level, and the graph structure mirrors your mental model. Agents decompose tasks into subgraphs, and you navigate progress like a map instead of scrolling through terminal tabs. No cold starts — return after days and instantly see where everything stands.
