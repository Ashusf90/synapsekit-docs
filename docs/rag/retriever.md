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

## Metadata filtering

Filter results by metadata before ranking:

```python
results = await retriever.retrieve(
    "Your query",
    top_k=5,
    metadata_filter={"source": "report.pdf"},
)
```

Only documents whose metadata contains all specified key-value pairs are considered.

## MMR retrieval (diversity)

Maximal Marginal Relevance balances relevance with diversity to reduce redundant results:

```python
results = await retriever.retrieve_mmr(
    "Your query",
    top_k=5,
    lambda_mult=0.5,  # 0 = max diversity, 1 = max relevance
    fetch_k=20,       # Initial candidate pool size
)
```

MMR greedily selects documents that maximize:
`lambda * relevance(query, doc) - (1-lambda) * max_similarity(doc, selected_docs)`

## RAG Fusion

Generate multiple query variations with an LLM and fuse results using Reciprocal Rank Fusion for better recall:

```python
from synapsekit import RAGFusionRetriever

fusion = RAGFusionRetriever(
    retriever=retriever,
    llm=llm,
    num_queries=3,   # Number of query variations to generate
    rrf_k=60,        # RRF constant (higher = less aggressive reranking)
)

results = await fusion.retrieve("What is quantum computing?", top_k=5)
```

The process:
1. LLM generates `num_queries` variations of your query
2. Each variation (plus the original) is used to retrieve results
3. Results are fused using Reciprocal Rank Fusion scoring
4. Documents appearing in multiple result sets rank higher

## Contextual Retrieval

Inspired by Anthropic's Contextual Retrieval approach. Before embedding, each chunk is enriched with a short LLM-generated context sentence, improving accuracy for ambiguous chunks:

```python
from synapsekit import ContextualRetriever

cr = ContextualRetriever(
    retriever=retriever,
    llm=llm,
)

# Add chunks — each gets a context sentence prepended before embedding
await cr.add_with_context(["chunk one...", "chunk two..."])

# Retrieve as normal
results = await cr.retrieve("What is quantum computing?", top_k=5)
```

The process:
1. For each chunk, the LLM generates a 1-2 sentence context
2. The context is prepended to the chunk before embedding
3. At retrieval time, the enriched embeddings improve search accuracy

You can customize the context generation prompt:

```python
cr = ContextualRetriever(
    retriever=retriever,
    llm=llm,
    context_prompt="Summarize this chunk in one sentence:\n{chunk}",
)
```

## Sentence Window Retrieval

Embeds individual sentences for fine-grained search, but returns a window of surrounding sentences for richer context:

```python
from synapsekit import SentenceWindowRetriever

swr = SentenceWindowRetriever(
    retriever=retriever,
    window_size=2,  # Include 2 sentences before and after the match
)

# Add full documents — they're split into sentences automatically
await swr.add_documents(["Full document text here. With multiple sentences. And more."])

# Retrieve — matched sentences are expanded with surrounding context
results = await swr.retrieve("query", top_k=3)
```

The process:
1. Documents are split into individual sentences
2. Each sentence is embedded independently for fine-grained matching
3. At retrieval time, matched sentences are expanded with `window_size` surrounding sentences

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `top_k` | `4` | Number of chunks to return |
| `use_bm25` | `False` | Enable BM25 reranking |
| `bm25_weight` | `0.3` | Weight for BM25 score in hybrid ranking |
| `metadata_filter` | `None` | Filter by metadata key-value pairs |
