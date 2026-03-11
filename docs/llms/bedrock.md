---
sidebar_position: 8
---

# AWS Bedrock

Run Claude, Titan, Llama, and other models via AWS Bedrock.

## Install

```bash
pip install synapsekit[bedrock]
```

AWS credentials must be configured (e.g. via `~/.aws/credentials`, environment variables, or an IAM role).

## Via the RAG facade

```python
from synapsekit import RAG

# Claude on Bedrock
rag = RAG(
    model="anthropic.claude-3-sonnet-20240229-v1:0",
    api_key="env",   # uses AWS credential chain
    provider="bedrock",
)
rag.add("Your document text here")
answer = rag.ask_sync("Summarize the document.")
```

## Direct usage

```python
from synapsekit.llm.bedrock import BedrockLLM
from synapsekit.llm.base import LLMConfig

llm = BedrockLLM(
    LLMConfig(
        model="anthropic.claude-3-haiku-20240307-v1:0",
        api_key="env",
        provider="bedrock",
        temperature=0.3,
        max_tokens=1024,
    ),
    region="us-east-1",
)

async for token in llm.stream("What is SynapseKit?"):
    print(token, end="", flush=True)
```

## Supported model families

| Family | Example model ID |
|---|---|
| Anthropic Claude | `anthropic.claude-3-sonnet-20240229-v1:0` |
| Amazon Titan | `amazon.titan-text-express-v1` |
| Meta Llama | `meta.llama2-13b-chat-v1` |

See [AWS Bedrock docs](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html) for the full list.
