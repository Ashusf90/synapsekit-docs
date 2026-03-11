---
sidebar_position: 5
---

# Cohere

## Install

```bash
pip install synapsekit[cohere]
```

## Via the RAG facade

```python
from synapsekit import RAG

rag = RAG(model="command-r-plus", api_key="your-cohere-key")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
```

## Direct usage

```python
from synapsekit.llm.cohere import CohereLLM
from synapsekit.llm.base import LLMConfig

llm = CohereLLM(LLMConfig(
    model="command-r-plus",
    api_key="your-cohere-key",
    provider="cohere",
    temperature=0.3,
    max_tokens=1024,
))

async for token in llm.stream("Explain retrieval-augmented generation."):
    print(token, end="", flush=True)
```

## Supported models

- `command-r-plus` — most capable
- `command-r` — faster, cheaper
- `command` — legacy

See [Cohere docs](https://docs.cohere.com/docs/models) for the full list.
