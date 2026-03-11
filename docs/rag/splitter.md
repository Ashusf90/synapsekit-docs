---
sidebar_position: 3
---

# Text Splitter

`TextSplitter` breaks documents into chunks for embedding. Pure Python, zero dependencies.

## Basic usage

```python
from synapsekit.splitter import TextSplitter

splitter = TextSplitter(chunk_size=512, chunk_overlap=50)
chunks = splitter.split("Your long document text here...")

for chunk in chunks:
    print(chunk)
```

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `chunk_size` | `512` | Maximum characters per chunk |
| `chunk_overlap` | `50` | Characters of overlap between chunks |
| `separators` | `["\n\n", "\n", " ", ""]` | Tried in order for splitting |

## How it works

Uses recursive character splitting — tries each separator in order, splitting on the first one that produces chunks below `chunk_size`. This preserves paragraph and sentence boundaries wherever possible.

```python
# Custom separators
splitter = TextSplitter(
    chunk_size=1024,
    chunk_overlap=100,
    separators=["\n\n", "\n", ". ", " ", ""]
)
```
