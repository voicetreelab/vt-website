---
title: "From RAG to PAG: Why Pruning-Augmented Generation Preserves What Retrieval Destroys"
description: RAG treats context as disconnected chunks and fails on deep reasoning. PAG (Pruning-Augmented Generation) preserves semantic relationships through hierarchical tree navigation. A paradigm shift from "retrieve chunks" to "navigate structure."
---

RAG is everywhere. It's the default answer when someone asks "how do I give my LLM access to documents?" But RAG has a fundamental problem that gets worse the more you need it: it destroys the relationships between pieces of information.

We've been building an alternative we call PAG: Pruning-Augmented Generation. Instead of retrieving disconnected chunks, PAG preserves semantic structure by navigating hierarchical trees. The difference matters most exactly where RAG fails: multi-hop reasoning, complex queries, and tasks requiring understanding of how concepts relate to each other.

## The Fundamental Problem with RAG

RAG works by converting documents into vector embeddings, then retrieving the chunks most similar to your query. Simple, scalable, and fundamentally broken for anything requiring reasoning.

Here's why: when you chunk a document and retrieve pieces based on similarity, you lose the relationships between those pieces. You get fragments that mention relevant keywords, but not the context that connects them.

Consider asking about a bug in your codebase. RAG might retrieve:
- A chunk mentioning the error message
- A chunk about the function where it occurs
- A chunk from a related PR discussion

But it won't understand that the PR discussion *resolved* the issue by changing the function, and that change introduced a *new* edge case causing your current error. That reasoning requires traversing relationships, not matching embeddings.

The benchmarks confirm this. [LongBench v2](https://arxiv.org/abs/2412.15204) specifically tests multi-hop reasoning over long contexts, and RAG approaches consistently fail where they need to chain multiple pieces of information together. GPT-4o drops from 99.3% to 69.7% accuracy on [NoLiMa](https://arxiv.org/abs/2502.05167) (non-literal association finding) at just 32K tokens, even with its supposedly excellent long-context support.

The attention mechanism scales quadratically. "Long context" windows don't solve the problem; they just let you fail with more tokens.

## RAG Treats Context Like Grep When It Should Be a File System

The best analogy: RAG is grep. You search for a pattern, you get lines that match. Useful, but limited.

What you actually need is a file system. Structure. Hierarchy. The ability to navigate from a directory to its contents, to understand that these files belong together and that file relates to this other one.

Information naturally has tree structure:
- Conversations branch into topics and sub-topics
- Code has hierarchy: modules contain classes contain methods
- Documents have sections, subsections, and paragraphs
- Reasoning chains have premises that lead to conclusions

When you flatten this into chunks and retrieve by similarity, you destroy the structure that makes the information useful.

## PAG: Pruning Instead of Retrieving

Pruning-Augmented Generation takes a different approach. Instead of retrieving chunks, it navigates structure. We call it PAG because the core operation is *pruning* irrelevant branches while preserving structure—the inverse of RAG's additive retrieval.

The process:
1. Convert content into a hierarchical tree (we call this a VoiceTree)
2. For any query, prune irrelevant branches
3. Navigate remaining structure with progressive disclosure: titles first, then summaries, then full content
4. LLM traverses the tree like browsing directories, requesting more detail where needed

What's preserved that RAG loses:
- **Parent-child relationships**: A summary connects to its details
- **Sibling relationships**: Related concepts at the same level stay together
- **Traversal paths**: The LLM can trace how it got to a piece of information

This isn't a minor improvement. On [NoLiMa benchmarks](https://arxiv.org/abs/2502.05167), tree-based navigation achieves 90% token reduction while maintaining accuracy where other approaches fail. The LLM processes 80-90% fewer tokens and gets better results because it's working with structured information instead of disconnected chunks.

## Where PAG Beats RAG

PAG particularly outperforms on:

**Multi-hop reasoning**: When answering requires connecting information across multiple sources. The tree structure preserves the paths between related concepts.

**Complex queries**: Questions that can't be answered by a single chunk. PAG lets the LLM navigate to gather what it needs while maintaining context of where each piece fits.

**Conversational context**: Chat histories branch naturally. PAG preserves which messages relate to which topics, rather than treating the whole history as flat text.

**Codebase understanding**: Code is hierarchical. Retrieving function chunks loses the module and class context that makes them interpretable.

**Deep document analysis**: Legal documents, technical specs, research papers all have structure that matters for understanding.

## How PAG Works in Practice

The algorithm:
1. Vector search finds N most relevant nodes in the tree
2. Get traversal paths to these nodes, with progressive expansion: titles only, then titles + summaries, then full content as you get closer
3. Include local neighborhood (D=1) around traversal paths
4. LLM evaluates and either answers or requests more context via specific nodes or new search queries
5. Repeat with unseen nodes until the question is answered

The key insight: the LLM controls navigation. It sees the structure and decides what to explore further. This is fundamentally different from RAG where the retriever makes all decisions before the LLM sees anything.

## The Paradigm Shift

RAG asks: "What chunks match this query?"

PAG asks: "What structure contains this answer, and how do I navigate to it?"

This mirrors how humans actually use information. You don't memorize documents as disconnected facts; you understand how concepts relate and navigate that structure when you need specific details.

Current approaches treat context as flat text. PAG recognizes that information has structure, preserves it, and uses it for intelligent navigation. It's the difference between grep and a file system, between a bag of words and a knowledge graph.

## Building PAG Systems

The key components:
1. **Tree construction**: Convert linear text to hierarchical representation while preserving semantic relationships
2. **Intelligent pruning**: Remove irrelevant branches without breaking connections
3. **Progressive disclosure**: Let the LLM control its exploration depth
4. **Iterative navigation**: Support multi-turn traversal for complex queries

This is what we're building at Voicetree. The same technology that helps humans organize their thinking turns out to be exactly what LLMs need for better context management.

We've measured 90% token reduction on standard benchmarks while maintaining accuracy. More importantly, PAG succeeds on the multi-hop reasoning tasks where RAG consistently fails.

The future isn't longer context windows. It's structured context that preserves the relationships making information useful.

---

If you're interested in exploring PAG for your applications, we're building this into Voicetree. [Join the waitlist](https://forms.gle/H4sWKnWqZNRjWNkp6) to try it.
