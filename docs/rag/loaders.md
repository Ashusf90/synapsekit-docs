---
sidebar_position: 2
---

# Document Loaders

Loaders ingest content and return a list of `Document` objects.

## TextLoader

Load a plain text file:

```python
from synapsekit.loaders import TextLoader

loader = TextLoader("path/to/file.txt")
docs = loader.load()

for doc in docs:
    print(doc.text)
    print(doc.metadata)  # {"source": "path/to/file.txt"}
```

## StringLoader

Load a string directly (useful for testing or dynamic content):

```python
from synapsekit.loaders import StringLoader

loader = StringLoader("Your raw text content here.")
docs = loader.load()
```

## Document schema

```python
@dataclass
class Document:
    text: str
    metadata: dict = field(default_factory=dict)
```

## Coming in Phase 2

- `PDFLoader` — via `pypdf`
- `HTMLLoader` — via `beautifulsoup4`
- `CSVLoader`
- `JSONLoader`
- `DirectoryLoader` — load all files in a folder
- `WebLoader` — fetch and parse a URL
