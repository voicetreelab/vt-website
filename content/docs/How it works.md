---
title: How Voicetree Works
description: Technical overview of Voicetree's voice-to-graph pipeline and local-first architecture. Learn how speech becomes structured knowledge graphs using vector search and LLMs.
---

# How Voicetree Works

## Voice to Graph

When you speak or type into Voicetree, we first run a vector search to find potentially relevant nodes, these vectors are stored on device only with a local ChromaDB instance. Then from these options, an LLM (gemini-2.5-flash) decide which node to append to, or create a new child node at. This is saved to markdown files, which are rendered as nodes and edges on the canvas. You can continue speaking naturally, and new ideas will automatically connect to relevant existing nodes, turning a stream of consciousness into a structured, navigable knowledge graph.

## Local-First Architecture

Each node in your graph is simply a markdown file, stored only on your device, editable with any text editor, this is not stored on any external servers. Alongside each markdown file, Voicetree maintains a corresponding vector embedding in a local ChromaDB database, also stored entirely on-device. These vectors enable semantic search and intelligent context retrieval. Your data stays private by design.
