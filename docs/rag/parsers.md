---
sidebar_position: 5
---

# Output Parsers

Parsers extract structured data from raw LLM text output.

---

## JSONParser

Extract and parse JSON from anywhere in the LLM response — handles preamble text, code fences, etc.

```python
from synapsekit import JSONParser

parser = JSONParser()

# Clean JSON
data = parser.parse('{"name": "Alice", "score": 9}')

# JSON embedded in prose
data = parser.parse('Here is the result: {"name": "Alice", "score": 9}')

# Raises ValueError if no valid JSON found
```

---

## ListParser

Parse bullet-point or numbered lists from LLM output into a Python list.

```python
from synapsekit import ListParser

parser = ListParser()

# Bullet list
items = parser.parse("- item one\n- item two\n- item three")
# → ["item one", "item two", "item three"]

# Numbered list
items = parser.parse("1. first\n2. second\n3. third")
# → ["first", "second", "third"]

# Asterisk style
items = parser.parse("* alpha\n* beta\n* gamma")
# → ["alpha", "beta", "gamma"]
```

---

## PydanticParser

Parse LLM JSON output directly into a Pydantic model.

```bash
pip install pydantic
```

```python
from pydantic import BaseModel
from synapsekit import PydanticParser

class Review(BaseModel):
    score: int
    sentiment: str
    summary: str

parser = PydanticParser(Review)

review = parser.parse("""
{
  "score": 8,
  "sentiment": "positive",
  "summary": "Great product, fast shipping."
}
""")

print(review.score)      # 8
print(review.sentiment)  # "positive"
```

Raises `ValidationError` if the JSON doesn't match the model schema.

---

## Using parsers with a RAG pipeline

```python
from synapsekit import RAG, JSONParser

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
rag.add("Product reviews data...")

raw = await rag.ask(
    "Return a JSON object with keys: score (int), sentiment (str)."
)

result = JSONParser().parse(raw)
print(result["score"])
```
