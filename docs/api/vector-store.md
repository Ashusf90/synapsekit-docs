---
sidebar_position: 2
---

# VectorStore API

## `InMemoryVectorStore`

```python
InMemoryVectorStore(embeddings: SynapsekitEmbeddings)
```

### Methods

| Method | Signature | Description |
|---|---|---|
| `add` | `add(texts: list[str], metadata: list[dict] \| None = None)` | Embed and store texts |
| `search` | `async search(query: str, top_k: int = 4) -> list[ScoredDocument]` | Cosine similarity search |
| `save` | `save(path: str)` | Persist to `.npz` file |
| `load` | `classmethod load(path: str, embeddings) -> InMemoryVectorStore` | Load from `.npz` file |

## `SynapsekitEmbeddings`

```python
SynapsekitEmbeddings(model: str = "all-MiniLM-L6-v2")
```

Uses `sentence-transformers` under the hood. Lazy import — only loaded when first used.

### Methods

| Method | Signature | Description |
|---|---|---|
| `embed` | `embed(texts: list[str]) -> np.ndarray` | Returns shape `(n, dim)` |
| `embed_query` | `embed_query(text: str) -> np.ndarray` | Returns shape `(dim,)` |
