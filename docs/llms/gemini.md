---
sidebar_position: 7
---

# Google Gemini

## Install

```bash
pip install synapsekit[gemini]
```

## Via the RAG facade

```python
from synapsekit import RAG

rag = RAG(model="gemini-1.5-pro", api_key="your-google-api-key")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
```

## Direct usage

```python
from synapsekit.llm.gemini import GeminiLLM
from synapsekit.llm.base import LLMConfig

llm = GeminiLLM(LLMConfig(
    model="gemini-1.5-pro",
    api_key="your-google-api-key",
    provider="gemini",
    temperature=0.3,
    max_tokens=1024,
))

async for token in llm.stream("Explain vector embeddings."):
    print(token, end="", flush=True)
```

## Supported models

- `gemini-1.5-pro` — most capable
- `gemini-1.5-flash` — faster, lower cost
- `gemini-1.0-pro`

See [Google AI docs](https://ai.google.dev/models/gemini) for the full list.
