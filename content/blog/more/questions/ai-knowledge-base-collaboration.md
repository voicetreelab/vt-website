---
title: How can AI agents collaborate with your knowledge base?
description: AI agents can navigate, understand, and modify your knowledge base. They can linearize trees into content, suggest connections, and propose better structures.
tags:
  - ai-collaboration
  - knowledge-base
  - rag
---

## How can AI agents collaborate with your knowledge base?

AI agents can navigate your knowledge base, understand it, modify it, and use it to enhance their work.

### What AI Can Do With Your Tree

- **Navigate and understand** - AI sees the full structure and relationships
- **Modify and extend** - Add new nodes, update existing ones, create connections
- **Linearize content** - Turn a tree of concepts into a blog post, report, or documentation
- **Suggest connections** - Find links between concepts you haven't thought of
- **Propose restructuring** - Recommend better ways to organize your concepts

### Context Retrieval Algorithm

When AI needs information from your tree:

1. Find N most related nodes via vector search + BM25
2. Get traversals with expanding context (titles → summaries → full content)
3. Include neighborhood nodes and children
4. LLM either answers or requests more specific context
5. Iterate until the answer is complete

### Why Trees Beat Flat Documents

Tree structure provides natural chunking and hierarchy that matches how humans think. The AI can zoom in on relevant subtrees without loading your entire knowledge base.

**Related:** [[From RAG to PAG]]
