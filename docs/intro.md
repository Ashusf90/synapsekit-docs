---
sidebar_position: 1
---

# Introduction

**SynapseKit** is a lightweight, async-first RAG framework for Python.

> What FastAPI did to Flask/Django — SynapseKit does to LangChain.

## Why SynapseKit?

| | LangChain | LlamaIndex | **SynapseKit** |
|---|---|---|---|
| Streaming-native | ✗ | ✗ | **✓** |
| Async-native | Partial | Partial | **✓** |
| Install size | ~500MB | ~400MB | **~50MB** |
| No magic / no callbacks | ✗ | ✗ | **✓** |
| Hard dependencies | Many | Many | **2** (`numpy` + `rank-bm25`) |

## Three-line quickstart

```python
from synapsekit import RAG

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
rag.add("Your document text here")

# Streaming
async for token in rag.stream("What is the main topic?"):
    print(token, end="", flush=True)

# Non-streaming
answer = await rag.ask("What is the main topic?")

# Sync (notebooks / scripts)
answer = rag.ask_sync("What is the main topic?")
```

## What's included

**Phase 2 is complete.** SynapseKit now ships:

- **7 LLM providers** — OpenAI, Anthropic, Ollama, Cohere, Mistral, Gemini, AWS Bedrock
- **8 document loaders** — Text, String, PDF, HTML, CSV, JSON, Directory, Web
- **3 output parsers** — JSON, Pydantic, List
- **3 prompt templates** — PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate
- **5 vector store backends** — InMemory, Chroma, FAISS, Qdrant, Pinecone
- **Full RAG pipeline** — chunking, embedding, retrieval, BM25 rerank, streaming, memory, tracing

## Design principles

1. `stream()` is always primary — `generate()` is just `"".join([...async for...])`
2. All I/O is `async`. Sync wrappers use `asyncio.run()`.
3. Every external import is lazy with clear error messages
4. No global state — every class is independently instantiable
5. Hard deps: `numpy` + `rank-bm25` only. Everything else optional.
6. No chains, no callbacks, no magic — just async functions and plain classes
