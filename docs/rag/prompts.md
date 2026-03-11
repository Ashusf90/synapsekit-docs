---
sidebar_position: 6
---

# Prompt Templates

Prompt templates help you build reusable, parameterised prompts and message lists.

---

## PromptTemplate

f-string style single prompt.

```python
from synapsekit import PromptTemplate

pt = PromptTemplate("Translate the following text to {language}:\n\n{text}")

prompt = pt.format(language="French", text="Hello, how are you?")
# → "Translate the following text to French:\n\nHello, how are you?"
```

---

## ChatPromptTemplate

Build a `List[dict]` message structure for chat models.

```python
from synapsekit import ChatPromptTemplate

cpt = ChatPromptTemplate([
    {"role": "system", "content": "You are a helpful {persona}."},
    {"role": "user",   "content": "Explain {topic} in simple terms."},
])

messages = cpt.format_messages(persona="science teacher", topic="black holes")
# → [
#     {"role": "system", "content": "You are a helpful science teacher."},
#     {"role": "user",   "content": "Explain black holes in simple terms."},
#   ]
```

Pass the result directly to any LLM's `stream_with_messages()`:

```python
from synapsekit.llm.openai import OpenAILLM
from synapsekit.llm.base import LLMConfig

llm = OpenAILLM(LLMConfig(model="gpt-4o-mini", api_key="sk-..."))

messages = cpt.format_messages(persona="chef", topic="pasta")
async for token in llm.stream_with_messages(messages):
    print(token, end="")
```

---

## FewShotPromptTemplate

Render few-shot examples followed by the actual query.

```python
from synapsekit import FewShotPromptTemplate

fsp = FewShotPromptTemplate(
    examples=[
        {"input": "2 + 2",   "output": "4"},
        {"input": "10 - 3",  "output": "7"},
        {"input": "3 × 3",   "output": "9"},
    ],
    example_template="Input: {input}\nOutput: {output}",
    suffix="Input: {question}\nOutput:",
)

prompt = fsp.format(question="5 + 8")
# → """
# Input: 2 + 2
# Output: 4
#
# Input: 10 - 3
# Output: 7
#
# Input: 3 × 3
# Output: 9
#
# Input: 5 + 8
# Output:
# """
```
