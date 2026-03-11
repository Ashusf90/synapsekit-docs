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
    async def stream_with_messages(self, messages: list[dict], **kwargs) -> AsyncIterator[str]: ...
    async def generate_with_messages(self, messages: list[dict], **kwargs) -> str: ...
```

`generate()` is always implemented as `"".join([...async for... in stream()])` — streaming is primary.

## LLMConfig

```python
from synapsekit import LLMConfig

config = LLMConfig(
    model="gpt-4o-mini",
    api_key="sk-...",
    provider="openai",
    system_prompt="You are a helpful assistant.",
    temperature=0.2,
    max_tokens=1024,
)
```

## Available providers

| Provider | Class | Extra | Provider string |
|---|---|---|---|
| OpenAI | `OpenAILLM` | `pip install synapsekit[openai]` | `"openai"` |
| Anthropic | `AnthropicLLM` | `pip install synapsekit[anthropic]` | `"anthropic"` |
| Ollama | `OllamaLLM` | `pip install synapsekit[ollama]` | `"ollama"` |
| Cohere | `CohereLLM` | `pip install synapsekit[cohere]` | `"cohere"` |
| Mistral | `MistralLLM` | `pip install synapsekit[mistral]` | `"mistral"` |
| Google Gemini | `GeminiLLM` | `pip install synapsekit[gemini]` | `"gemini"` |
| AWS Bedrock | `BedrockLLM` | `pip install synapsekit[bedrock]` | `"bedrock"` |

## Auto-detection

The `RAG` facade auto-detects the provider from the model name:

| Model prefix | Detected provider |
|---|---|
| `claude-*` | `anthropic` |
| `gemini-*` | `gemini` |
| `command-*` | `cohere` |
| `mistral-*`, `open-mistral-*` | `mistral` |
| everything else | `openai` |

Override with the `provider=` argument:

```python
rag = RAG(model="llama3", api_key="", provider="ollama")
```

## Tokens and cost tracking

Every provider tracks input/output tokens:

```python
llm = OpenAILLM(config)
await llm.generate("Hello!")
print(llm.tokens_used)  # {"input": 12, "output": 8}
```

The `TokenTracer` in `RAGPipeline` aggregates this across all calls.
