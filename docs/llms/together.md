---
sidebar_position: 12
---

# Together AI

[Together AI](https://together.ai/) provides fast inference on open-source models with an OpenAI-compatible API.

## Install

```bash
pip install synapsekit[openai]
```

Together AI uses the OpenAI-compatible API, so it requires the `openai` package.

## Usage

```python
from synapsekit import LLMConfig
from synapsekit.llm.together import TogetherLLM

llm = TogetherLLM(LLMConfig(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
    api_key="...",
))

async for token in llm.stream("What is RAG?"):
    print(token, end="", flush=True)
```

## Available models

| Model | ID |
|---|---|
| Llama 3.3 70B Turbo | `meta-llama/Llama-3.3-70B-Instruct-Turbo` |
| Mixtral 8x7B | `mistralai/Mixtral-8x7B-Instruct-v0.1` |
| Qwen 2.5 72B | `Qwen/Qwen2.5-72B-Instruct-Turbo` |
| DeepSeek V3 | `deepseek-ai/DeepSeek-V3` |

See the full list at [together.ai/models](https://api.together.ai/models).

## Function calling

```python
result = await llm.call_with_tools(messages, tools)
```

## Custom base URL

```python
llm = TogetherLLM(config, base_url="http://localhost:8000/v1")
```

## Parameters

| Parameter | Description |
|---|---|
| `model` | Together AI model ID |
| `api_key` | Your Together AI API key |
| `base_url` | Custom API base URL (default: `https://api.together.xyz/v1`) |
