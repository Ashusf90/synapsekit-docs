---
sidebar_position: 3
---

# Text Splitters

Text splitters break documents into chunks for embedding and retrieval. SynapseKit provides five splitters — all extend `BaseSplitter` and share the same `split(text) → list[str]` interface.

## BaseSplitter

All splitters inherit from `BaseSplitter`:

```python
from synapsekit import BaseSplitter

class BaseSplitter(ABC):
    def split(self, text: str) -> list[str]: ...
```

You can implement your own splitter by subclassing `BaseSplitter` and implementing `split()`.

## CharacterTextSplitter

Splits on a **single separator string**. Simple and fast.

```python
from synapsekit import CharacterTextSplitter

splitter = CharacterTextSplitter(
    separator="\n\n",
    chunk_size=512,
    chunk_overlap=50,
)

chunks = splitter.split("Paragraph one.\n\nParagraph two.\n\nParagraph three.")
```

| Parameter | Default | Description |
|---|---|---|
| `separator` | `"\n\n"` | The string to split on |
| `chunk_size` | `512` | Maximum characters per chunk |
| `chunk_overlap` | `50` | Characters of overlap between consecutive chunks |

## RecursiveCharacterTextSplitter

Tries splitting by **paragraphs → sentences → words → hard split** until chunks fit. This is the default splitter used by `RAGPipeline`.

```python
from synapsekit import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=50,
    separators=["\n\n", "\n", ". ", " "],
)

chunks = splitter.split(long_document)
```

| Parameter | Default | Description |
|---|---|---|
| `chunk_size` | `512` | Maximum characters per chunk |
| `chunk_overlap` | `50` | Characters of overlap between consecutive chunks |
| `separators` | `["\n\n", "\n", ". ", " "]` | Tried in order; first one that produces multiple parts is used |

:::info Backward compatibility
`TextSplitter` from `synapsekit.rag.pipeline` is now an alias for `RecursiveCharacterTextSplitter`. Existing code works without changes.
:::

## TokenAwareSplitter

Splits text so each chunk fits within a **token budget**. Uses a heuristic of ~4 characters per token and delegates to `RecursiveCharacterTextSplitter`.

```python
from synapsekit import TokenAwareSplitter

splitter = TokenAwareSplitter(
    max_tokens=256,
    chunk_overlap=50,
)

chunks = splitter.split(long_document)
# Each chunk ≤ 256 × 4 = 1024 characters
```

| Parameter | Default | Description |
|---|---|---|
| `max_tokens` | `256` | Maximum tokens per chunk |
| `chunk_overlap` | `50` | Characters of overlap between chunks |
| `chars_per_token` | `4` | Character-to-token ratio (override for non-English text) |

## SemanticSplitter

Splits at **semantic boundaries** using sentence embeddings. Sentences whose cosine similarity to the next sentence drops below a threshold are treated as split points.

```bash
pip install synapsekit[semantic]
```

```python
from synapsekit import SemanticSplitter

splitter = SemanticSplitter(
    model="all-MiniLM-L6-v2",
    threshold=0.5,
    min_chunk_size=50,
)

chunks = splitter.split(document)
```

| Parameter | Default | Description |
|---|---|---|
| `model` | `"all-MiniLM-L6-v2"` | Sentence-transformers model for embeddings |
| `threshold` | `0.5` | Cosine similarity threshold — lower = more splits |
| `min_chunk_size` | `50` | Minimum characters before allowing a split |

:::warning
`SemanticSplitter` requires `sentence-transformers`. Install with `pip install synapsekit[semantic]`.
:::

## Using splitters with RAGPipeline

By default, `RAGPipeline` uses `RecursiveCharacterTextSplitter` with the `chunk_size` and `chunk_overlap` from `RAGConfig`. You can override this by passing any `BaseSplitter` to `RAGConfig.splitter`:

```python
from synapsekit import RAGConfig, RAGPipeline, TokenAwareSplitter

config = RAGConfig(
    llm=llm,
    retriever=retriever,
    memory=memory,
    splitter=TokenAwareSplitter(max_tokens=200),
)

pipeline = RAGPipeline(config)
await pipeline.add("Your document text here...")
```

When `splitter` is set, it overrides `chunk_size` and `chunk_overlap`.

## Writing a custom splitter

```python
from synapsekit import BaseSplitter

class SentenceSplitter(BaseSplitter):
    def split(self, text: str) -> list[str]:
        text = text.strip()
        if not text:
            return []
        # Split on sentence endings
        sentences = [s.strip() + "." for s in text.split(". ") if s.strip()]
        return sentences

splitter = SentenceSplitter()
chunks = splitter.split("First sentence. Second sentence. Third sentence.")
# ["First sentence.", "Second sentence.", "Third sentence."]
```
