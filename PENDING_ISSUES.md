# Pending Issues for synapsekit-docs

These issues need to be created on https://github.com/SynapseKit/synapsekit-docs once the GitHub rate limit lifts.

Each issue should get the comment:
> Thanks for your interest! I will assign it to you. Before you start, could you give the repo a ⭐ on the main repo (https://github.com/SynapseKit/SynapseKit)? It really helps with visibility for a new project. Looking forward to your PR!

---

## 1. Add interactive code playground (live code editor)
**Labels:** enhancement, ui/ux

Add an interactive code playground where users can write and run SynapseKit code directly in the browser.

- Integrate [Sandpack](https://sandpack.codesandbox.io/) or [Pyodide](https://pyodide.org/) for in-browser Python execution
- Add a `<Playground />` component that renders an editor + output panel
- Pre-load SynapseKit (or mock the LLM calls for demo purposes)
- Add playground pages for RAG, Agents, and Graph quickstarts

**Why:** Interactive docs convert visitors to users 10x faster than static code blocks.

---

## 2. Add copy button to all code blocks
**Labels:** good first issue, ui/ux

Add a one-click copy button to every code block in the docs.

- Docusaurus has this built-in — enable in `docusaurus.config.ts`
- Verify it works on all code blocks
- Style the button to match the theme

---

## 3. Add dark mode support
**Labels:** good first issue, ui/ux

Add a dark/light mode toggle to the docs site.

- Docusaurus supports this natively via `colorMode` in `docusaurus.config.ts`
- Ensure all custom components, code blocks, and tables look good in both modes
- Add system preference detection (`respectPrefersColorScheme: true`)

---

## 4. Add search functionality (Algolia or local)
**Labels:** enhancement, ui/ux

Add full-text search to the docs site.

- Option 1: [Algolia DocSearch](https://docsearch.algolia.com/) — free for open-source
- Option 2: [@easyops-cn/docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) — no external service
- Configure in `docusaurus.config.ts`

**Why:** Search is the #1 most-used feature on documentation sites.

---

## 5. Add API reference auto-generation from docstrings
**Labels:** enhancement

Auto-generate API reference documentation from Python docstrings instead of maintaining it manually.

- Build a script that parses Python docstrings and generates .md files
- Auto-generate pages for: BaseLLM, RAGPipeline, StateGraph, CompiledGraph, BaseTool, VectorStore, BaseSplitter
- Run as part of CI so docs stay in sync with code

---

## 6. Add version dropdown for docs (multi-version support)
**Labels:** enhancement, ui/ux

Add version selector so users can view docs for different SynapseKit versions.

- Use Docusaurus versioning: `npx docusaurus docs:version 0.5.0`
- Add version dropdown to navbar

---

## 7. Add animated hero section on landing page
**Labels:** ui/ux

Replace the current plain landing page with an animated hero section.

- Typing animation showing code being written
- Animated diagram of RAG pipeline / graph workflow
- Animated stats counter (332 tests, 9 providers, 2 deps)
- Use Framer Motion or CSS animations
- Create custom `<Hero />` React component

---

## 8. Add feature comparison table (SynapseKit vs LangChain vs LlamaIndex)
**Labels:** documentation, ui/ux

Add a visually appealing comparison table.

- Create `docs/comparison.md` or custom React component
- Compare: dependencies, async support, streaming, providers, vector stores, agents, graph workflows
- Use checkmarks/crosses with color coding
- Keep it factual and fair

---

## 9. Add tabbed code examples (show multiple providers side by side)
**Labels:** good first issue, ui/ux

Use Docusaurus tabs to show the same example across different LLM providers.

- Use `@docusaurus/theme-classic` Tabs component
- Show tabs: OpenAI | Anthropic | Ollama | Gemini on quickstart and provider pages

---

## 10. Add architecture diagram page
**Labels:** documentation, ui/ux

Create a visual architecture overview showing how SynapseKit's components connect.

- Create `docs/architecture.md`
- Add Mermaid diagrams: high-level components, RAG pipeline flow, agent loop, graph execution
- Add to sidebar under 'Architecture' section

---

## 11. Add progress indicator / reading time to pages
**Labels:** good first issue, ui/ux

Show estimated reading time and a scroll progress bar on documentation pages.

- Add reading time estimation
- Add thin colored progress bar at top that fills as user scrolls

---

## 12. Add 'Edit this page' button on every doc page
**Labels:** good first issue, ui/ux

Add a link to edit each page on GitHub.

- Configure `editUrl` in `docusaurus.config.ts`:
  ```js
  docs: {
    editUrl: 'https://github.com/SynapseKit/synapsekit-docs/edit/main/',
  }
  ```

---

## 13. Add changelog page with visual timeline
**Labels:** ui/ux, documentation

Create a beautiful changelog page with a visual timeline.

- Show each version as a card with version number, date, key features, type badge
- Pull data from CHANGELOG.md or maintain separately
- Add to navbar

---

## 14. Add breadcrumbs navigation
**Labels:** good first issue, ui/ux

Add breadcrumb navigation at the top of each page.

- Docusaurus 3 has breadcrumbs enabled by default — verify and customize

---

## 15. Add announcement banner for new releases
**Labels:** good first issue, ui/ux

Add a dismissable announcement banner at the top.

- Use Docusaurus `announcementBar` in `docusaurus.config.ts`
- Show current version, link to changelog

---

## 16. Add custom 404 page
**Labels:** good first issue, ui/ux

Create a custom 404 page with search bar, links to popular pages, and friendly message.

- Create `src/pages/404.tsx`

---

## 17. Add syntax highlighting for more languages
**Labels:** good first issue, ui/ux

Add syntax highlighting for bash, json, yaml, toml, sql, diff.

- Configure `prism.additionalLanguages` in `docusaurus.config.ts`

---

## 18. Add testimonials / user quotes section
**Labels:** ui/ux

Add a testimonials section on the landing page.

- Create `<Testimonials />` React component
- Show 3-6 quotes with name, role, avatar
- Carousel or grid layout

---

## 19. Add newsletter / email signup
**Labels:** ui/ux

Add an email signup form for release announcements.

- Add in footer or dedicated section
- Options: Buttondown, Substack, Mailchimp, or ConvertKit

---

## 20. Add 'Getting Started' tutorial with step-by-step wizard
**Labels:** documentation, ui/ux

Create an interactive getting-started tutorial.

- Steps: Installation, First RAG pipeline, Adding an agent, Building a graph, Deploying
- Each step has: explanation, code, expected output
- Add progress tracking (step 1 of 5)

---

## 21. Add social card / OG image for link previews
**Labels:** good first issue, ui/ux

Add Open Graph images so docs links look great when shared.

- Create template OG image (1200x630px)
- Configure in `docusaurus.config.ts` metadata
- Test with Twitter Card Validator

---

## 22. Add keyboard shortcuts for navigation
**Labels:** ui/ux

Add keyboard shortcuts: `/` for search, `←`/`→` for prev/next, `t` for dark mode toggle, `?` for help.

---

## 23. Add 'Was this page helpful?' feedback widget
**Labels:** ui/ux

Add thumbs up/down feedback widget at bottom of each docs page.

- Create `<PageFeedback />` React component
- Send data to GitHub issue, Google Form, or analytics

---

## 24. Add mobile-responsive hamburger menu
**Labels:** good first issue, ui/ux

Verify sidebar works on mobile, fix any overflow or styling issues, ensure code blocks scroll horizontally.

---

## 25. Add TOC (Table of Contents) on right sidebar
**Labels:** good first issue, ui/ux

Show table of contents on right side of long pages.

- Configure `themeConfig.tableOfContents` with `minHeadingLevel: 2, maxHeadingLevel: 4`
- Highlight current section on scroll

---

## 26. Add badges/shields for ecosystem packages on provider pages
**Labels:** good first issue, ui/ux

Add PyPI badges and version info for each optional dependency on provider pages.

---

## 27. Add FAQ page
**Labels:** good first issue, documentation

Create FAQ page with collapsible answers using `<details>` component.

Suggested FAQs: Python version, vs LangChain, local models, custom providers, FastAPI, production-readiness, contributing.

---

## 28. Add SEO optimization (meta tags, sitemap, structured data)
**Labels:** enhancement

Optimize docs site for search engines.

- Meta descriptions on key pages
- Enable `@docusaurus/plugin-sitemap`
- Add JSON-LD structured data
- Submit sitemap to Google Search Console

---

## 29. Add i18n / internationalization support
**Labels:** enhancement

Set up internationalization — start with English + Chinese.

- Configure Docusaurus i18n
- Add language switcher to navbar

---

## 30. Add blog section for tutorials and announcements
**Labels:** enhancement, documentation

Enable Docusaurus blog plugin.

- First posts: 'Introducing SynapseKit v0.5.0', 'Why we built SynapseKit', 'Building your first RAG pipeline'
- Configure RSS feed

---

## 31. Add Storybook-style component showcase for graph nodes
**Labels:** ui/ux

Create a visual showcase of available graph node types with interactive examples.

- Show each node type as a card: node function, agent_node, rag_node, conditional edge
- Click to see in a full graph example

---

## 32. Add performance benchmarks page
**Labels:** documentation

Add page showing SynapseKit's performance benchmarks.

- Benchmark: import time, RAG query latency, streaming TTFT, memory usage
- Compare with LangChain
- Show graphs/charts
- Re-run for each release
