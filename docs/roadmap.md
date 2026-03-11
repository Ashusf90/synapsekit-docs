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

## Phase 2 — Own the Niche 🔜

**Goal: be the undisputed best async RAG library.**

- More loaders: `PDFLoader`, `HTMLLoader`, `CSVLoader`, `JSONLoader`, `DirectoryLoader`, `WebLoader`
- Output parsers: `JSONParser`, `PydanticParser`, `ListParser`
- More vector stores: `ChromaVectorStore`, `FAISSVectorStore`, `QdrantVectorStore`, `PineconeVectorStore`
- More LLMs: `OllamaLLM`, `CohereLLM`, `MistralLLM`, `GeminiLLM`, `BedrockLLM`
- Prompt templates: `PromptTemplate`, `ChatPromptTemplate`, `FewShotPromptTemplate`
- Public benchmark suite vs LangChain / LlamaIndex

## Phase 3 — Agents 🔜

- `BaseTool` ABC + tool registry
- `ReActAgent` — Reasoning + Acting loop
- `FunctionCallingAgent` — native OpenAI/Anthropic tool use
- `AgentExecutor` + `AgentMemory`
- Built-in tools: `WebSearchTool`, `CalculatorTool`, `PythonREPLTool`, `FileReadTool`, `SQLQueryTool`

## Phase 4 — Graph Workflows 🔜

- `Graph` — DAG-based workflow primitive
- `Node`, `Edge`, `ConditionalEdge`
- Parallel node execution
- Mermaid diagram export

## Phase 5 — Structured Output + Evaluation 🔜

- Pydantic model output with retry on parse failure
- `Evaluator` — faithfulness, relevancy, groundedness
- RAGAS-style metrics
- CLI: `synapsekit benchmark --vs langchain`

## Phase 6 — Platform 🔜

- Local observability UI (LangSmith-style, open source)
- Streaming UI helpers — SSE + WebSocket for FastAPI
- Multi-modal support
- `synapsekit serve` — deploy any app as FastAPI in one command
- Prompt hub — versioned prompt registry
