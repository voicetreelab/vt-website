---
title: How We Achieved 90% Token Reduction on LLM Context Without Losing Accuracy
description: Tree-based context pruning achieves 90% token reduction while maintaining accuracy on benchmarks where RAG fails. This isn't retrieval - it's preserving semantic relationships through hierarchical navigation.
---

GPT-4o drops from 99.3% to 69.7% accuracy on the [NoLiMa benchmark](https://arxiv.org/abs/2502.05167) at just 32K tokens. That's a 30-point accuracy cliff, and it happens on what OpenAI calls a "long context" model.

The problem isn't context length. It's how we're using it.

## The Long Context Problem

Every major LLM provider is racing to extend context windows. 128K tokens. 200K. A million. The implicit promise: throw more context at the model, get better results.

The benchmarks tell a different story. Attention scales quadratically with context length. As the context grows, models spend increasing compute attending to irrelevant information. The signal drowns in noise.

This isn't a temporary limitation waiting for better hardware. It's architectural. More context doesn't mean better understanding - it often means worse.

## Why RAG Fails at Deep Reasoning

Retrieval-Augmented Generation was supposed to solve this. Break your knowledge into chunks, embed them, retrieve the relevant ones when needed.

RAG works well for simple lookups. "What's the return policy?" Find the chunk, return the answer.

But [LongBench v2](https://arxiv.org/abs/2412.15204) revealed a critical failure mode: RAG breaks on multi-hop reasoning. When the answer requires connecting information across multiple chunks, retrieval falls apart. You can't reason about relationships between chunks you retrieved independently.

The fundamental problem: RAG treats context like grep when it should treat it like a file system. Grep finds strings. File systems preserve structure.

## Tree-Based Context Navigation

Text naturally has tree structure. Conversations branch. Code has hierarchy. Documents have sections, subsections, paragraphs.

Current approaches flatten this structure into linear text, then try to retrieve relevant pieces. We're destroying information before we even start.

The alternative: preserve the tree structure, and let the LLM navigate it.

Here's how it works:

1. **Convert text to tree** - Conversations, documents, codebases get transformed into hierarchical representations. Each node has a title, summary, and full content.

2. **Progressive disclosure** - Start by showing only titles. Then titles and summaries. Then expand specific branches to full content. The LLM requests what it needs.

3. **Preserve relationships** - Parent-child relationships survive pruning. The model knows "this detail belongs under that concept" even when it hasn't seen the full content.

4. **Navigate, don't retrieve** - Instead of embedding chunks and doing similarity search, the model traverses the structure. It's the difference between searching a filesystem by filename and actually navigating directories.

## Benchmark Results

On the NoLiMa benchmark (non-literal association finding), our tree-based approach achieved:

- 90% reduction in tokens sent to the model
- Maintained accuracy where baseline approaches failed
- Reduced output token counts and latency (the model stops going in circles when it's not overwhelmed)

The key insight: information has structure. Preserve it, and you can be surgical about what you send. Flatten it, and you're back to grep.

Early experiments on [GSM-Infinite](https://arxiv.org/abs/2502.05252) showed agents given a tree representation read 85% less content while still achieving correct answers on medium-difficulty datasets.

The counterintuitive bonus: output tokens and latency also decreased. When the model isn't overwhelmed with irrelevant context, it stops going in circles. The navigation overhead is more than offset by the reduction in confused, repetitive outputs.

## Why This Works

RAG asks: "Which chunks are similar to the query?"

Tree navigation asks: "What's the structure of this information, and which branches are relevant?"

The difference matters because reasoning requires relationships. When you retrieve chunks independently, you lose the connective tissue. When you navigate a tree, the structure itself carries information.

Consider debugging a codebase. You don't grep for "error" and hope the relevant file shows up. You navigate: src -> services -> auth -> the module that handles tokens. The path tells you something the destination doesn't.

## From Dev Tools to Infrastructure

We started building this for a specific use case: managing multiple AI agents working in parallel on a codebase. The context-switching cost was crushing. Six agents, each needing to understand what the others were doing, each reprocessing the entire conversation history.

Tree-based context made it tractable. Agents share a tree workspace. They read summaries of other agents' work. They expand branches when they need details. The n-squared context explosion becomes manageable.

But the implications go beyond developer tools. Every LLM provider has the same problem: context costs compute, and most context is irrelevant for any given query.

Tree-based context isn't just a feature. It's a layer that should sit between applications and LLM APIs. Compress on the way in, expand on the way out, save 80-90% of tokens without losing the reasoning ability.

The benchmarks are clear: long context isn't working. The alternative is structured context.

---

*VoiceTree is building tools for context engineering - managing what information LLMs see and when. [Watch the demo](https://youtu.be/h_JtlkDhNTI) or [join the alpha](https://forms.gle/H4sWKnWqZNRjWNkp6).*
