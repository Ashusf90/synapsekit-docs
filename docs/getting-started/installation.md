---
sidebar_position: 1
---

# Installation

SynapseKit uses optional dependency groups so you only install what you need.

## Requirements

- Python 3.10+

## Install

```bash
# OpenAI only
pip install synapsekit[openai]

# Anthropic only
pip install synapsekit[anthropic]

# All providers
pip install synapsekit[all]
```

## Optional extras

| Extra | Installs | Use case |
|---|---|---|
| `openai` | `openai` | GPT-4, GPT-4o, etc. |
| `anthropic` | `anthropic` | Claude 3.5, Claude 4, etc. |
| `all` | All of the above | Everything |

## Verify installation

```python
import synapsekit
print(synapsekit.__version__)
```
