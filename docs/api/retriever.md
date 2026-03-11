---
sidebar_position: 3
---

# Retriever API

## `Retriever`

```python
Retriever(
    store: InMemoryVectorStore,
    use_bm25: bool = False,
    bm25_weight: float = 0.3,
)
```

### Methods

| Method | Signature | Description |
|---|---|---|
| `retrieve` | `async retrieve(query: str, top_k: int = 4) -> list[ScoredDocument]` | Retrieve top-k relevant chunks |

## `ScoredDocument`

```python
@dataclass
class ScoredDocument:
    text: str
    score: float
    metadata: dict
```
