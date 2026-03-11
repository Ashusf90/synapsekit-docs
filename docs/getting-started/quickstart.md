---
sidebar_position: 2
---

# Quickstart

## Minimal RAG in 3 lines

```python
from synapsekit import RAG

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
rag.add("SynapseKit is an async-first RAG framework for Python.")

answer = rag.ask_sync("What is SynapseKit?")
print(answer)
```

## Streaming response

```python
import asyncio
from synapsekit import RAG

async def main():
    rag = RAG(model="gpt-4o-mini", api_key="sk-...")
    rag.add("SynapseKit is an async-first RAG framework for Python.")

    async for token in rag.stream("What is SynapseKit?"):
        print(token, end="", flush=True)

asyncio.run(main())
```

## Using Anthropic (Claude)

```python
from synapsekit import RAG

rag = RAG(model="claude-sonnet-4-6", api_key="sk-ant-...")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
print(answer)
```

## Using a local model with Ollama

```python
from synapsekit import RAG

rag = RAG(model="llama3", api_key="", provider="ollama")
rag.add("Your document text here")

answer = rag.ask_sync("Summarize the document.")
```

## Loading documents

```python
from synapsekit import RAG, TextLoader, PDFLoader, CSVLoader, DirectoryLoader

rag = RAG(model="gpt-4o-mini", api_key="sk-...")

# Text file
docs = TextLoader("notes.txt").load()
rag.add_documents(docs)

# PDF — one Document per page
docs = PDFLoader("report.pdf").load()
rag.add_documents(docs)

# CSV — one Document per row
docs = CSVLoader("data.csv", text_column="content").load()
rag.add_documents(docs)

# Whole directory (auto-detects .txt, .pdf, .csv, .json, .html)
docs = DirectoryLoader("./my_docs/").load()
rag.add_documents(docs)

answer = rag.ask_sync("What did I just load?")
```

## Fetching a web page

```python
import asyncio
from synapsekit import RAG, WebLoader

async def main():
    docs = await WebLoader("https://example.com").load()
    rag = RAG(model="gpt-4o-mini", api_key="sk-...")
    rag.add_documents(docs)
    print(await rag.ask("What is this page about?"))

asyncio.run(main())
```

## Parsing LLM output

```python
from synapsekit import JSONParser, ListParser
from synapsekit import PydanticParser
from pydantic import BaseModel

# Extract JSON from any LLM response
data = JSONParser().parse('Result: {"score": 9, "label": "positive"}')

# Parse a numbered or bullet list
items = ListParser().parse("1. First item\n2. Second item\n3. Third item")

# Parse into a Pydantic model
class Review(BaseModel):
    score: int
    label: str

review = PydanticParser(Review).parse('{"score": 9, "label": "positive"}')
```

## What happens under the hood

When you call `rag.add(text)`:
1. Text is split into chunks via `TextSplitter`
2. Chunks are embedded via `SynapsekitEmbeddings` (sentence-transformers)
3. Embeddings are stored in `InMemoryVectorStore`

When you call `rag.ask(query)`:
1. Query is embedded
2. Top-k chunks retrieved via cosine similarity + optional BM25 rerank
3. Retrieved context + query sent to LLM
4. Response streamed or collected and returned
