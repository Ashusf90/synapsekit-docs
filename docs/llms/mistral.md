---
sidebar_position: 6
---

# Mistral AI

## Install

```bash
pip install synapsekit[mistral]
```

## Via the RAG facade

```python
from synapsekit import RAG

rag = RAG(model="mistral-large-latest", api_key="your-mistral-key")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
```

## Direct usage

```python
from synapsekit.llm.mistral import MistralLLM
from synapsekit.llm.base import LLMConfig

llm = MistralLLM(LLMConfig(
    model="mistral-large-latest",
    api_key="your-mistral-key",
    provider="mistral",
    temperature=0.3,
    max_tokens=1024,
))

async for token in llm.stream("What is RAG?"):
    print(token, end="", flush=True)
```

## Supported models

- `mistral-large-latest`
- `mistral-small-latest`
- `open-mistral-7b`
- `open-mixtral-8x7b`

See [Mistral docs](https://docs.mistral.ai/getting-started/models/) for the full list.
