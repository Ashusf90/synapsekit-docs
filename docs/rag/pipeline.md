---
sidebar_position: 1
---

# RAG Pipeline

`RAGPipeline` is the full orchestrator. The `RAG` facade wraps it for the happy path.

## Using the `RAG` facade

```python
from synapsekit import RAG

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
rag.add("Document text...")

# Async
answer = await rag.ask("Your question?")

# Streaming
async for token in rag.stream("Your question?"):
    print(token, end="")

# Sync
answer = rag.ask_sync("Your question?")
```

## Using `RAGPipeline` directly

For full control:

```python
from synapsekit.pipeline import RAGPipeline
from synapsekit.llms import OpenAILLM, LLMConfig
from synapsekit.embeddings import SynapsekitEmbeddings
from synapsekit.vectorstore import InMemoryVectorStore
from synapsekit.retriever import Retriever
from synapsekit.splitter import TextSplitter

llm = OpenAILLM(LLMConfig(model="gpt-4o-mini", api_key="sk-..."))
embeddings = SynapsekitEmbeddings()
store = InMemoryVectorStore(embeddings)
retriever = Retriever(store)
splitter = TextSplitter()

pipeline = RAGPipeline(llm=llm, retriever=retriever, splitter=splitter)

pipeline.add("Your document text...")
answer = await pipeline.ask("Your question?")
```

## Persistence

Save and load your vector store across sessions:

```python
# Save
store.save("my_store.npz")

# Load
store = InMemoryVectorStore.load("my_store.npz", embeddings)
```
