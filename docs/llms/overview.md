---
sidebar_position: 1
---

# LLM Overview

All LLMs in SynapseKit extend `BaseLLM` and share the same interface.

## Interface

```python
class BaseLLM(ABC):
    async def stream(self, prompt: str, **kwargs) -> AsyncIterator[str]: ...
    async def generate(self, prompt: str, **kwargs) -> str: ...
```

`generate()` is always implemented as `"".join([...async for... in stream()])` — streaming is primary.

## LLMConfig

```python
from synapsekit.llms import LLMConfig

config = LLMConfig(
    model="gpt-4o-mini",
    api_key="sk-...",
    temperature=0.7,
    max_tokens=1024,
)
```

## Available providers

| Provider | Class | Extra |
|---|---|---|
| OpenAI | `OpenAILLM` | `pip install synapsekit[openai]` |
| Anthropic | `AnthropicLLM` | `pip install synapsekit[anthropic]` |

## Coming in Phase 2

- `OllamaLLM` — local models
- `CohereLLM`
- `MistralLLM`
- `GeminiLLM`
- `BedrockLLM`
