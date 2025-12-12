---
title: "Managing 6+ AI Agents Simultaneously: A Workspace Architecture That Scales"
description: As AI agents handle longer tasks autonomously, the bottleneck shifts from execution to human coordination. With n agents in parallel, context switching grows quadratically. The solution is a shared tree workspace where agents are landmarks, not terminal tabs.
priority: 5
draft: true
---

Last week I ran six coding agents in parallel across a complex refactor. I finished in four hours what would have taken two days solo. The week before that, I tried the same thing with three agents and created a mess that took me longer to untangle than doing it myself.

The difference wasn't the agents. It was how I managed them.

## The Agentic Productivity Paradox

AI agents can now handle 20+ minutes of engineering work before needing input. In theory, running three agents should mean 3x productivity. In practice, most developers find that more agents creates more chaos.

Why? Because running multiple agents doesn't just parallelize execution. It multiplies coordination overhead.

Consider a simple scenario: you finish preparing a task in 10 minutes, but the agent takes 20 minutes to execute. Seems efficient to spawn a second agent while the first runs. Now you have two agents. When Agent 1 finishes, you need to:

1. Review Agent 1's work (context switch)
2. Prepare Agent 3's task (context switch)
3. Ensure Agent 1's output and Agent 3's future work don't conflict with Agent 2

That's three context switches just from adding one more agent.

## The n-squared Problem

With n parallel agents, context switches grow roughly as n-squared. Every agent's output potentially affects every other agent's input - and you're the one holding it all together.

The more agents you add, the worse it gets. At some point you're spending more time coordinating than the agents are spending coding.

This is the agentic bottleneck: **the cost of managing agents exceeds the cost of doing the work yourself**.

Most "multi-agent frameworks" try to solve this with orchestration layers - CrewAI, AutoGen, LangGraph. They add coordinator agents, message passing, explicit handoffs. More complexity to manage complexity.

There's a simpler approach.

## Shared Tree Workspace

Instead of orchestrating agents through code, let them coordinate through shared structure.

The workspace is a tree of markdown notes. Each agent works from a node in the tree and writes its results back into that node. Humans can add, edit, or move notes in the same tree.

Because everything is in one structure, agents see what other agents and humans have done. Workflows are just paths through the tree.

No message passing. No coordinator. Just a shared workspace that all participants can read and write.

Instead of managing processes in a queue, you're navigating landmarks in space.

## Why This Beats Orchestration

Traditional orchestration requires you to explicitly define:
- Which agent talks to which agent
- When handoffs happen
- What information passes between them
- How to resolve conflicts

With a shared workspace, coordination is implicit:
- Agents see each other's outputs by reading the tree
- Handoffs happen naturally when one agent writes context another agent needs
- Information passing is just reading parent/sibling nodes
- Conflicts are visible as conflicting nodes you can see and resolve

The tree becomes the coordination mechanism. No orchestration layer needed.

## Never Re-Explain

The most painful part of managing multiple agents is re-explaining context. Every new agent starts cold. Every context switch requires rebuilding mental state.

With a shared tree, when you launch an agent it inherits all relevant context from its position in the tree. The context is already there - in the parent nodes, sibling nodes, and prior work documented in place.

This saves hours of re-explaining per day. Context isn't something you provide to each agent. It's something agents discover by their position in the workspace.

## Spatial Navigation

Your brain is excellent at remembering where things are in space. Terminal tabs aren't spatial - they're a stack. You cycle through them, losing track of what's where.

A tree workspace turns agents into landmarks on a map. Agent 1 is in the "API refactor" branch. Agent 2 is under "test coverage." Agent 3 is working on "database migration."

When you need to check on an agent, you navigate to a location, not search through tabs. When you need to resume a task, you go back to where you left it. The spatial metaphor matches how memory actually works.

## Running Parallel Agents: A Practical Workflow

Here's how this looks in practice:

1. **Structure first**: Before spawning agents, create the tree structure. Each major task gets a branch. Dependencies are visible as tree relationships.

2. **One agent per node**: Launch each agent from a specific node. The agent reads context from that node's ancestors and writes results back to that node or its children.

3. **Progress as nodes**: Agents don't just write final code. They document progress, decisions, and blockers as nodes in the tree. You see their state at a glance.

4. **Coordinate through structure**: Need Agent 2 to wait for Agent 1? Put Agent 2's node as a child of Agent 1's output node. The dependency is structural.

5. **Review spatially**: When agents finish, review by walking the tree. The context you need is right there, not scattered across chat histories.

This approach scales because adding agents doesn't add coordination code. It just adds more nodes to a tree you're already navigating.

## What Actually Limits You

The bottleneck in agentic development isn't agent capability. It's human coordination capacity. More agents means more context switches, and context switching costs compound.

The solution isn't better orchestration frameworks. It's a shared workspace where coordination happens through structure, not code. Where agents are landmarks you navigate to, not processes you manage.

Six agents feels manageable when they're locations on a map. It feels overwhelming when they're tabs in a terminal.

---

*Related: [[90-percent-token-reduction|How We Achieved 90% Token Reduction]] - the context engineering that makes shared workspaces possible. And [[Complexity Threshold]] - keeping each agent under the threshold that produces good work.*
