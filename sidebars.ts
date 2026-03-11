import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quickstart'],
    },
    {
      type: 'category',
      label: 'RAG',
      items: ['rag/pipeline', 'rag/loaders', 'rag/splitter', 'rag/retriever'],
    },
    {
      type: 'category',
      label: 'LLMs',
      items: ['llms/overview', 'llms/openai', 'llms/anthropic'],
    },
    {
      type: 'category',
      label: 'Memory & Tracing',
      items: ['memory/conversation', 'memory/token-tracer'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/llm', 'api/vector-store', 'api/retriever'],
    },
    'roadmap',
  ],
};

export default sidebars;
