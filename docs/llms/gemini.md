---
sidebar_position: 7
---

# Google Gemini

## Install

```bash
pip install synapsekit[gemini]
```

## Via the RAG facade

```python
from synapsekit import RAG

rag = RAG(model="gemini-1.5-pro", api_key="your-google-api-key")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
```

## Direct usage

```python
from synapsekit.llm.gemini import GeminiLLM
from synapsekit.llm.base import LLMConfig

llm = GeminiLLM(LLMConfig(
    model="gemini-1.5-pro",
    api_key="your-google-api-key",
    provider="gemini",
    temperature=0.3,
    max_tokens=1024,
))

async for token in llm.stream("Explain vector embeddings."):
    print(token, end="", flush=True)
```

## Function calling

GeminiLLM supports native function calling via `call_with_tools()`. This enables the `FunctionCallingAgent` to work with Gemini models.

```python
from synapsekit import FunctionCallingAgent, CalculatorTool
from synapsekit.llm.gemini import GeminiLLM
from synapsekit.llm.base import LLMConfig

llm = GeminiLLM(LLMConfig(
    model="gemini-1.5-pro",
    api_key="your-google-api-key",
    provider="gemini",
))

agent = FunctionCallingAgent(
    llm=llm,
    tools=[CalculatorTool()],
)

answer = await agent.run("What is 144 divided by 12?")
```

### How it works

SynapseKit automatically converts OpenAI-format tool schemas to Gemini's `FunctionDeclaration` format. Response `function_call` parts are parsed back into the standard `{"id", "name", "arguments"}` format. Since Gemini doesn't provide tool call IDs, SynapseKit generates them via `uuid4`.

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
# {"content": None, "tool_calls": [{"id": "call_...", "name": "get_weather", "arguments": {"city": "Paris"}}]}
```

## Supported models

- `gemini-1.5-pro` — most capable
- `gemini-1.5-flash` — faster, lower cost
- `gemini-1.0-pro`

See [Google AI docs](https://ai.google.dev/models/gemini) for the full list.
