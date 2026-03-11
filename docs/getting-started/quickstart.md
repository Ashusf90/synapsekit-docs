---
sidebar_position: 2
---

# Quickstart

## Minimal RAG in 3 lines

```python
from synapsekit import RAG

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
rag.add("SynapseKit is an async-first RAG framework for Python.")

answer = rag.ask_sync("What is SynapseKit?")
print(answer)
```

## Streaming response

```python
import asyncio
from synapsekit import RAG

async def main():
    rag = RAG(model="gpt-4o-mini", api_key="sk-...")
    rag.add("SynapseKit is an async-first RAG framework for Python.")

    async for token in rag.stream("What is SynapseKit?"):
        print(token, end="", flush=True)

asyncio.run(main())
```

## Using Anthropic (Claude)

```python
from synapsekit import RAG

rag = RAG(model="claude-sonnet-4-6", api_key="sk-ant-...")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
print(answer)
```

## Loading multiple documents

```python
from synapsekit import RAG
from synapsekit.loaders import TextLoader

rag = RAG(model="gpt-4o-mini", api_key="sk-...")

loader = TextLoader("path/to/file.txt")
docs = loader.load()
for doc in docs:
    rag.add(doc.text)

answer = rag.ask_sync("What is this document about?")
```

## What happens under the hood

When you call `rag.add(text)`:
1. Text is split into chunks via `TextSplitter`
2. Chunks are embedded via `SynapsekitEmbeddings` (sentence-transformers)
3. Embeddings are stored in `InMemoryVectorStore`

When you call `rag.ask(query)`:
1. Query is embedded
2. Top-k chunks retrieved via cosine similarity + optional BM25 rerank
3. Retrieved context + query sent to LLM
4. Response streamed or collected and returned
