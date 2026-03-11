---
sidebar_position: 2
---

# OpenAI

## Install

```bash
pip install synapsekit[openai]
```

## Usage

```python
from synapsekit.llms import OpenAILLM, LLMConfig

llm = OpenAILLM(LLMConfig(
    model="gpt-4o-mini",
    api_key="sk-...",
    temperature=0.7,
))

# Streaming
async for token in llm.stream("Tell me about async Python."):
    print(token, end="", flush=True)

# Full response
response = await llm.generate("Tell me about async Python.")
print(response)
```

## Supported models

Any model supported by the OpenAI API: `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-3.5-turbo`, etc.
