---
sidebar_position: 11
---

# OpenRouter

[OpenRouter](https://openrouter.ai/) is a unified API that provides access to 200+ models from OpenAI, Anthropic, Meta, Mistral, Google, and more — with automatic fallback and load balancing.

## Install

```bash
pip install synapsekit[openai]
```

OpenRouter uses the OpenAI-compatible API, so it requires the `openai` package.

## Usage

```python
from synapsekit import LLMConfig
from synapsekit.llm.openrouter import OpenRouterLLM

llm = OpenRouterLLM(LLMConfig(
    model="openai/gpt-4o",
    api_key="sk-or-...",
))

async for token in llm.stream("What is RAG?"):
    print(token, end="", flush=True)
```

## Available models

OpenRouter supports 200+ models. Some popular ones:

| Model | ID |
|---|---|
| GPT-4o | `openai/gpt-4o` |
| Claude 3.5 Sonnet | `anthropic/claude-3.5-sonnet` |
| Llama 3.3 70B | `meta-llama/llama-3.3-70b-instruct` |
| Mixtral 8x7B | `mistralai/mixtral-8x7b-instruct` |
| Gemini Pro | `google/gemini-pro` |

See the full list at [openrouter.ai/models](https://openrouter.ai/models).

## Function calling

```python
result = await llm.call_with_tools(messages, tools)
```

Function calling support depends on the underlying model.

## Auto-detection

Models with a `/` in the name are auto-detected as OpenRouter:

```python
from synapsekit import RAG

rag = RAG(model="openai/gpt-4o", api_key="sk-or-...")
```

## Custom base URL

```python
llm = OpenRouterLLM(config, base_url="http://localhost:8000/v1")
```

## Parameters

| Parameter | Description |
|---|---|
| `model` | Any model ID from OpenRouter (e.g. `openai/gpt-4o`) |
| `api_key` | Your OpenRouter API key |
| `base_url` | Custom API base URL (default: `https://openrouter.ai/api/v1`) |
