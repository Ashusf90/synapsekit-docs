---
sidebar_position: 1
---

# Conversation Memory

`ConversationMemory` maintains a sliding window of recent messages for multi-turn conversations.

## Usage

```python
from synapsekit.memory import ConversationMemory

memory = ConversationMemory(window_size=10)

memory.add_user("What is SynapseKit?")
memory.add_assistant("SynapseKit is an async-first RAG framework.")

memory.add_user("How do I install it?")
memory.add_assistant("Run: pip install synapsekit[openai]")

# Get full history as a list of dicts
history = memory.get()
# [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}, ...]

# Clear memory
memory.clear()
```

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `window_size` | `10` | Max number of message pairs to keep |

When the window fills up, the oldest messages are dropped automatically.
