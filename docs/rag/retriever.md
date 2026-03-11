---
sidebar_position: 4
---

# Retriever

The `Retriever` finds the most relevant chunks for a query using vector similarity and optional BM25 reranking.

## Basic usage

```python
from synapsekit.retriever import Retriever
from synapsekit.vectorstore import InMemoryVectorStore
from synapsekit.embeddings import SynapsekitEmbeddings

embeddings = SynapsekitEmbeddings()
store = InMemoryVectorStore(embeddings)
store.add(["Chunk one...", "Chunk two...", "Chunk three..."])

retriever = Retriever(store)
results = await retriever.retrieve("Your query here", top_k=3)

for doc in results:
    print(doc.text, doc.score)
```

## BM25 reranking

Enable hybrid retrieval (vector + BM25) for better precision:

```python
retriever = Retriever(store, use_bm25=True, bm25_weight=0.3)
results = await retriever.retrieve("Your query", top_k=5)
```

Requires `rank-bm25` (included as a hard dependency).

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `top_k` | `4` | Number of chunks to return |
| `use_bm25` | `False` | Enable BM25 reranking |
| `bm25_weight` | `0.3` | Weight for BM25 score in hybrid ranking |
