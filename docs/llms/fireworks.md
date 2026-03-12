---
sidebar_position: 13
---

# Fireworks AI

[Fireworks AI](https://fireworks.ai/) provides optimized inference for open-source models with an OpenAI-compatible API.

## Install

```bash
pip install synapsekit[openai]
```

Fireworks AI uses the OpenAI-compatible API, so it requires the `openai` package.

## Usage

```python
from synapsekit import LLMConfig
from synapsekit.llm.fireworks import FireworksLLM

llm = FireworksLLM(LLMConfig(
    model="accounts/fireworks/models/llama-v3p3-70b-instruct",
    api_key="...",
))

async for token in llm.stream("What is RAG?"):
    print(token, end="", flush=True)
```

## Available models

| Model | ID |
|---|---|
| Llama 3.3 70B | `accounts/fireworks/models/llama-v3p3-70b-instruct` |
| Mixtral 8x7B | `accounts/fireworks/models/mixtral-8x7b-instruct` |
| Qwen 2.5 72B | `accounts/fireworks/models/qwen2p5-72b-instruct` |

See the full list at [fireworks.ai/models](https://fireworks.ai/models).

## Function calling

```python
result = await llm.call_with_tools(messages, tools)
```

## Custom base URL

```python
llm = FireworksLLM(config, base_url="http://localhost:8000/v1")
```

## Parameters

| Parameter | Description |
|---|---|
| `model` | Fireworks model ID |
| `api_key` | Your Fireworks API key |
| `base_url` | Custom API base URL (default: `https://api.fireworks.ai/inference/v1`) |
