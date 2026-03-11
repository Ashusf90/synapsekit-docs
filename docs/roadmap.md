---
sidebar_position: 99
---

# Roadmap

## Phase 1 — Core RAG ✅ Done

- `BaseLLM` ABC + `LLMConfig`
- `OpenAILLM` — async streaming
- `AnthropicLLM` — async streaming
- `SynapsekitEmbeddings` — sentence-transformers backend
- `InMemoryVectorStore` — numpy cosine sim + `.npz` persistence
- `Retriever` — vector search + BM25 rerank
- `TextSplitter` — pure Python, zero deps
- `ConversationMemory` — sliding window
- `TokenTracer` — tokens, latency, cost per call
- `TextLoader`, `StringLoader`
- `RAGPipeline` — full orchestrator
- `RAG` facade — 3-line happy path
- `run_sync()` — works inside/outside event loops
- 52 tests, all passing

## Phase 2 — Own the Niche ✅ Done

- **Loaders**: `PDFLoader`, `HTMLLoader`, `CSVLoader`, `JSONLoader`, `DirectoryLoader`, `WebLoader`
- **Output parsers**: `JSONParser`, `PydanticParser`, `ListParser`
- **Vector store backends**: `ChromaVectorStore`, `FAISSVectorStore`, `QdrantVectorStore`, `PineconeVectorStore`
- **LLM providers**: `OllamaLLM`, `CohereLLM`, `MistralLLM`, `GeminiLLM`, `BedrockLLM`
- **Prompt templates**: `PromptTemplate`, `ChatPromptTemplate`, `FewShotPromptTemplate`
- **VectorStore ABC** — all backends share one interface
- `Retriever.add()` — cleaner API, no internal `_store` access
- `RAGPipeline.add_documents(docs)` — ingest `List[Document]` directly
- `RAG.add_documents()` + `RAG.add_documents_async()`
- 141 tests, all passing

## Phase 3 — Agents ✅ Done

- **`BaseTool` ABC** — `run()`, `schema()`, `anthropic_schema()`, `ToolResult`
- **`ToolRegistry`** — lookup by name, OpenAI + Anthropic schema generation
- **`AgentMemory`** — step scratchpad, `format_scratchpad()`, max_steps limit
- **`ReActAgent`** — Thought → Action → Observation loop, any `BaseLLM`, no function calling required
- **`FunctionCallingAgent`** — native OpenAI tool_calls / Anthropic tool_use, multi-tool per step
- **`AgentExecutor`** — unified runner, `run()` / `stream()` / `run_sync()`, picks agent from config
- **`call_with_tools()`** — added to `OpenAILLM` and `AnthropicLLM`
- **Built-in tools**:
  - `CalculatorTool` — safe math eval, no deps
  - `PythonREPLTool` — exec with persistent namespace, stdout capture
  - `FileReadTool` — read local files
  - `WebSearchTool` — DuckDuckGo search, no API key (`pip install synapsekit[search]`)
  - `SQLQueryTool` — SQLite (stdlib) + SQLAlchemy for other databases
- 223 tests, all passing

## Phase 4 — Graph Workflows ✅ Done

- **`StateGraph`** — fluent DAG builder with compile-time validation and cycle detection
- **`CompiledGraph`** — wave-based async executor, `run()` / `stream()` / `run_sync()`
- **`Node`**, **`Edge`**, **`ConditionalEdge`** — sync + async node functions and routing
- **`agent_node()`**, **`rag_node()`** — wrap agents and RAG pipelines as graph nodes
- **Parallel execution** — nodes in the same wave run via `asyncio.gather()`
- **Mermaid diagram export** — `get_mermaid()` for any compiled graph
- **`_MAX_STEPS = 100`** guard against infinite conditional loops
- 267 tests, all passing

## Phase 5 — Production Features ✅ Done

- **Text Splitters** — `BaseSplitter` ABC, `CharacterTextSplitter`, `RecursiveCharacterTextSplitter`, `TokenAwareSplitter`, `SemanticSplitter` (cosine similarity boundaries)
- **Function calling for Gemini + Mistral** — `call_with_tools()` added to `GeminiLLM` and `MistralLLM` (4 providers now support native tool use)
- **LLM Response Caching** — `AsyncLRUCache` with SHA-256 cache keys, opt-in via `LLMConfig(cache=True)`
- **LLM Retries** — exponential backoff via `retry_async()`, skips auth errors, opt-in via `LLMConfig(max_retries=N)`
- **Graph Cycles** — `compile(allow_cycles=True)` skips static cycle detection for intentional loops
- **Configurable max_steps** — `compile(max_steps=N)` overrides the default 100-step guard
- **Graph Checkpointing** — `BaseCheckpointer` ABC, `InMemoryCheckpointer`, `SQLiteCheckpointer`
- **`CompiledGraph.resume()`** — re-execute from saved state
- **Adjacency optimization** — pre-built index for faster edge lookup
- **`RAGConfig.splitter`** — plug any `BaseSplitter` into the RAG pipeline
- 332 tests, all passing

## Phase 6 — Structured Output + Evaluation 🔜

- Pydantic model output with retry on parse failure
- `Evaluator` — faithfulness, relevancy, groundedness
- RAGAS-style metrics
- Multi-modal support (image inputs for vision models)
- Conversation branching and tree-of-thought

## Phase 7 — Platform 🔜

- Local observability UI (LangSmith-style, open source)
- Streaming UI helpers — SSE + WebSocket for FastAPI
- `synapsekit serve` — deploy any app as FastAPI in one command
- Prompt hub — versioned prompt registry
- Plugin system for community extensions
