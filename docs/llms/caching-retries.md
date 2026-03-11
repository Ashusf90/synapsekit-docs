---
sidebar_position: 9
---

# Caching & Retries

SynapseKit provides **opt-in response caching** and **exponential backoff retries** for all LLM providers. Both are configured through `LLMConfig` and are disabled by default — zero behavior change for existing code.

## Response caching

Cache LLM responses to avoid redundant API calls. The cache key is a SHA-256 hash of the model, prompt/messages, temperature, and max_tokens.

```python
from synapsekit.llm.openai import OpenAILLM
from synapsekit import LLMConfig

llm = OpenAILLM(LLMConfig(
    model="gpt-4o-mini",
    api_key="sk-...",
    provider="openai",
    cache=True,          # Enable caching
    cache_maxsize=128,   # LRU cache size (default)
))

# First call — hits the API
response1 = await llm.generate("What is Python?")

# Second call with same params — served from cache
response2 = await llm.generate("What is Python?")

assert response1 == response2  # Same response, no API call
```

### What gets cached

- `generate()` — cached
- `generate_with_messages()` — cached
- `stream()` — **not cached** (returns an async generator)
- `stream_with_messages()` — **not cached**

### Cache key

The cache key includes:
- Model name
- Prompt string (or full messages list)
- Temperature
- Max tokens

Different values for any of these produce different cache keys.

### LRU eviction

The cache uses an LRU (Least Recently Used) eviction policy. When `cache_maxsize` is exceeded, the oldest unused entry is evicted.

## Exponential backoff retries

Retry transient failures (rate limits, network errors) with exponential backoff.

```python
llm = OpenAILLM(LLMConfig(
    model="gpt-4o-mini",
    api_key="sk-...",
    provider="openai",
    max_retries=3,       # Retry up to 3 times
    retry_delay=1.0,     # Initial delay in seconds
))

# If the API returns a transient error:
# Attempt 1 — fails → wait 1s
# Attempt 2 — fails → wait 2s
# Attempt 3 — fails → wait 4s
# Attempt 4 — succeeds (or raises)
response = await llm.generate("Hello!")
```

### Auth errors are never retried

Errors containing these patterns are raised immediately without retrying:

- `"authentication"`, `"api_key"`, `"unauthorized"`, `"forbidden"`, `"permission"`

This prevents wasting retries on errors that will never succeed.

## Combining cache and retries

Both features can be used together:

```python
llm = OpenAILLM(LLMConfig(
    model="gpt-4o-mini",
    api_key="sk-...",
    provider="openai",
    cache=True,
    cache_maxsize=256,
    max_retries=3,
    retry_delay=0.5,
))
```

The flow is: **cache check → retry-wrapped API call → cache store**.

## LLMConfig reference

| Field | Type | Default | Description |
|---|---|---|---|
| `cache` | `bool` | `False` | Enable LRU response caching |
| `cache_maxsize` | `int` | `128` | Maximum number of cached responses |
| `max_retries` | `int` | `0` | Maximum retry attempts (0 = no retries) |
| `retry_delay` | `float` | `1.0` | Initial delay in seconds (doubles each attempt) |

:::info
These fields work with all LLM providers: OpenAI, Anthropic, Gemini, Mistral, Ollama, Cohere, and Bedrock.
:::
