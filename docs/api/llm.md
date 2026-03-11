---
sidebar_position: 1
---

# BaseLLM API

## `BaseLLM`

Abstract base class for all LLM providers.

```python
class BaseLLM(ABC):
    async def stream(self, prompt: str, **kwargs) -> AsyncIterator[str]: ...
    async def generate(self, prompt: str, **kwargs) -> str: ...
```

## `LLMConfig`

```python
@dataclass
class LLMConfig:
    model: str
    api_key: str
    temperature: float = 0.7
    max_tokens: int = 1024
```

## `OpenAILLM`

```python
OpenAILLM(config: LLMConfig, tracer: TokenTracer | None = None)
```

## `AnthropicLLM`

```python
AnthropicLLM(config: LLMConfig, tracer: TokenTracer | None = None)
```
