import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="docs/intro">
            Get Started →
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{marginLeft: '1rem'}}
            href="https://github.com/SynapseKit/SynapseKit">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}: {title: string; description: string}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Async-native',
    description:
      'Built async from day one. stream() is primary — not an afterthought bolted onto a sync API.',
  },
  {
    title: '~50MB install',
    description:
      'Two hard dependencies: numpy and rank-bm25. Everything else is optional. Compare to LangChain\'s ~500MB.',
  },
  {
    title: 'No magic',
    description:
      'No chains, no callbacks, no hidden state. Just async functions and plain Python classes you can read and understand.',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Lightweight, async-first RAG framework for Python. What FastAPI did to Flask — SynapseKit does to LangChain.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props) => (
                <Feature key={props.title} {...props} />
              ))}
            </div>
          </div>
        </section>
        <section style={{padding: '2rem 0', background: 'var(--ifm-background-surface-color)'}}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <Heading as="h2" className="text--center">RAG in 3 lines</Heading>
                <pre style={{marginTop: '1rem'}}>
                  <code className="language-python">{`from synapsekit import RAG

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
rag.add("Your document text here")

async for token in rag.stream("What is the main topic?"):
    print(token, end="", flush=True)`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
