---
sidebar_position: 6
---

# Cycles

By default, `StateGraph.compile()` raises `GraphConfigError` if it detects a cycle in static edges. This protects against accidental infinite loops.

For **intentional loops** (retry logic, iterative refinement, agent loops), pass `allow_cycles=True`:

```python
from synapsekit import StateGraph, END

async def process(state):
    return {"count": state.get("count", 0) + 1}

def should_continue(state):
    return "loop" if state["count"] < 5 else "done"

graph = (
    StateGraph()
    .add_node("process", process)
    .add_conditional_edge("process", should_continue, {
        "loop": "process",
        "done": END,
    })
    .set_entry_point("process")
    .compile(allow_cycles=True)
)

result = await graph.run({})
print(result["count"])  # 5
```

## Configurable max_steps

Every compiled graph has a step limit to prevent runaway loops. The default is `_MAX_STEPS = 100`. Override it at compile time:

```python
# Allow up to 500 iterations
graph = (
    StateGraph()
    .add_node("process", process)
    .add_conditional_edge("process", should_continue, {"loop": "process", "done": END})
    .set_entry_point("process")
    .compile(allow_cycles=True, max_steps=500)
)
```

If the limit is reached, `GraphRuntimeError` is raised:

```python
from synapsekit import GraphRuntimeError

try:
    result = await graph.run({})
except GraphRuntimeError as e:
    print(e)  # "Graph exceeded _MAX_STEPS=500. Check for infinite loops..."
```

## Static cycles vs conditional cycles

| Type | Detection | Example |
|---|---|---|
| **Static cycle** | Caught at compile time | `add_edge("a", "b")` + `add_edge("b", "a")` |
| **Conditional cycle** | Only caught at runtime via `max_steps` | `add_conditional_edge("a", route, {"loop": "a"})` |

`allow_cycles=True` only disables the **static** cycle check. The `max_steps` guard always applies.

## Example: iterative refinement

```python
from synapsekit import StateGraph, END

async def draft(state):
    # Generate or refine a draft
    iteration = state.get("iteration", 0) + 1
    return {
        "draft": f"Draft v{iteration}",
        "iteration": iteration,
    }

async def review(state):
    # Simulate review — approve after 3 iterations
    return {"approved": state["iteration"] >= 3}

def route(state):
    return "done" if state["approved"] else "revise"

graph = (
    StateGraph()
    .add_node("draft", draft)
    .add_node("review", review)
    .add_edge("draft", "review")
    .add_conditional_edge("review", route, {"revise": "draft", "done": END})
    .set_entry_point("draft")
    .compile(allow_cycles=True, max_steps=20)
)

result = await graph.run({})
print(result["draft"])      # "Draft v3"
print(result["approved"])   # True
```

## compile() parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `allow_cycles` | `bool` | `False` | Skip static cycle detection |
| `max_steps` | `int \| None` | `None` (uses `_MAX_STEPS=100`) | Maximum execution waves before raising |
