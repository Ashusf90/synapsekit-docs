---
sidebar_position: 6
---

# Mistral AI

## Install

```bash
pip install synapsekit[mistral]
```

## Via the RAG facade

```python
from synapsekit import RAG

rag = RAG(model="mistral-large-latest", api_key="your-mistral-key")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
```

## Direct usage

```python
from synapsekit.llm.mistral import MistralLLM
from synapsekit.llm.base import LLMConfig

llm = MistralLLM(LLMConfig(
    model="mistral-large-latest",
    api_key="your-mistral-key",
    provider="mistral",
    temperature=0.3,
    max_tokens=1024,
))

async for token in llm.stream("What is RAG?"):
    print(token, end="", flush=True)
```

## Function calling

MistralLLM supports native function calling via `call_with_tools()`. Mistral's API is OpenAI-compatible, so tool schemas work without conversion.

```python
from synapsekit import FunctionCallingAgent, CalculatorTool, WebSearchTool
from synapsekit.llm.mistral import MistralLLM
from synapsekit.llm.base import LLMConfig

llm = MistralLLM(LLMConfig(
    model="mistral-large-latest",
    api_key="your-mistral-key",
    provider="mistral",
))

agent = FunctionCallingAgent(
    llm=llm,
    tools=[CalculatorTool(), WebSearchTool()],
)

answer = await agent.run("Search for the population of France and calculate its square root.")
```

### Direct call_with_tools usage

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"},
                },
                "required": ["city"],
            },
        },
    }
]

messages = [
    {"role": "system", "content": "You are helpful."},
    {"role": "user", "content": "What's the weather in Paris?"},
]

result = await llm.call_with_tools(messages, tools)
# {"content": None, "tool_calls": [{"id": "...", "name": "get_weather", "arguments": {"city": "Paris"}}]}
```

## Supported models

- `mistral-large-latest`
- `mistral-small-latest`
- `open-mistral-7b`
- `open-mixtral-8x7b`

See [Mistral docs](https://docs.mistral.ai/getting-started/models/) for the full list.
