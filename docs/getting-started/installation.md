---
sidebar_position: 1
---

# Installation

SynapseKit uses optional dependency groups so you only install what you need.

## Requirements

- Python 3.14+

## Install

```bash
# OpenAI
pip install synapsekit[openai]

# Anthropic / Claude
pip install synapsekit[anthropic]

# All providers and loaders
pip install synapsekit[all]
```

## Optional extras

### LLM providers

| Extra | Installs | Use case |
|---|---|---|
| `openai` | `openai` | GPT-4o, GPT-4o-mini, etc. |
| `anthropic` | `anthropic` | Claude 3.5, Claude 4, etc. |
| `ollama` | `ollama` | Local models via Ollama |
| `cohere` | `cohere` | Cohere Command R+ |
| `mistral` | `mistralai` | Mistral Large, Small, etc. |
| `gemini` | `google-generativeai` | Gemini 1.5 Pro/Flash |
| `bedrock` | `boto3` | AWS Bedrock (Claude/Titan/Llama) |

### Document loaders

| Extra | Installs | Use case |
|---|---|---|
| `pdf` | `pypdf` | `PDFLoader` |
| `html` | `beautifulsoup4`, `lxml` | `HTMLLoader` |
| `web` | `httpx`, `beautifulsoup4` | `WebLoader` (async URL fetch) |

### Vector store backends

| Extra | Installs | Use case |
|---|---|---|
| `chroma` | `chromadb` | `ChromaVectorStore` |
| `faiss` | `faiss-cpu` | `FAISSVectorStore` |
| `qdrant` | `qdrant-client` | `QdrantVectorStore` |
| `pinecone` | `pinecone` | `PineconeVectorStore` |

### Embeddings

| Extra | Installs | Use case |
|---|---|---|
| `semantic` | `sentence-transformers` | Local embedding models |

## Combining extras

```bash
# OpenAI + PDF + Chroma
pip install synapsekit[openai,pdf,chroma]

# Ollama + FAISS (fully local)
pip install synapsekit[ollama,faiss,semantic]
```

## Verify installation

```python
import synapsekit
print(synapsekit.__version__)  # 0.2.0
```
