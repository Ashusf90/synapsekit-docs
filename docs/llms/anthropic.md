---
sidebar_position: 3
---

# Anthropic

## Install

```bash
pip install synapsekit[anthropic]
```

## Usage

```python
from synapsekit.llms import AnthropicLLM, LLMConfig

llm = AnthropicLLM(LLMConfig(
    model="claude-sonnet-4-6",
    api_key="sk-ant-...",
    temperature=0.7,
    max_tokens=1024,
))

# Streaming
async for token in llm.stream("Explain RAG in simple terms."):
    print(token, end="", flush=True)

# Full response
response = await llm.generate("Explain RAG in simple terms.")
print(response)
```

## Supported models

Any model supported by the Anthropic API: `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5`, etc.
