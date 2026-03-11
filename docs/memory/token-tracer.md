---
sidebar_position: 2
---

# Token Tracer

`TokenTracer` tracks token usage, latency, and estimated cost per LLM call.

## Usage

```python
from synapsekit.tracer import TokenTracer
from synapsekit.llms import OpenAILLM, LLMConfig

tracer = TokenTracer()
llm = OpenAILLM(LLMConfig(model="gpt-4o-mini", api_key="sk-..."), tracer=tracer)

response = await llm.generate("Hello world")

print(tracer.total_tokens)      # e.g. 42
print(tracer.total_cost_usd)    # e.g. 0.000021
print(tracer.total_latency_ms)  # e.g. 312

# Per-call breakdown
for call in tracer.calls:
    print(call.model, call.prompt_tokens, call.completion_tokens, call.latency_ms)
```

## Resetting

```python
tracer.reset()
```
