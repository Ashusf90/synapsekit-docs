---
sidebar_position: 4
---

# Ollama (Local)

Run open-source LLMs locally via [Ollama](https://ollama.com). No API key required.

## Install

```bash
# Install Ollama: https://ollama.com/download
ollama pull llama3

pip install synapsekit[ollama]
```

## Via the RAG facade

```python
from synapsekit import RAG

rag = RAG(model="llama3", api_key="", provider="ollama")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
print(answer)
```

## Direct usage

```python
from synapsekit.llm.ollama import OllamaLLM
from synapsekit.llm.base import LLMConfig

llm = OllamaLLM(LLMConfig(
    model="llama3",
    api_key="",
    provider="ollama",
    temperature=0.7,
    max_tokens=512,
))

async for token in llm.stream("Explain async Python in one paragraph."):
    print(token, end="", flush=True)
```

## Supported models

Any model you have pulled with `ollama pull`:

```bash
ollama pull llama3
ollama pull mistral
ollama pull gemma2
ollama pull phi3
ollama pull codellama
```
