import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FiCheck, FiLayout, FiDatabase, FiZap } from 'react-icons/fi';
import { SectionHeader, reveal, startProject } from './utils';

const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

const STATS = [
  { to: 28, suffix: '+', label: 'Shopify launches & relaunches' },
  { to: 40, suffix: '+', label: 'Theme & checkout tickets shipped' },
  { to: 18, suffix: '+', label: 'Merchants & partners, direct' },
  { to: 4, suffix: '+', label: 'Years focused only on Shopify' }
];

const CARES = [
  'Online Store 2.0 themes & section architecture',
  'Custom apps when off-the-shelf is not enough',
  'Metafields, metaobjects & clean content models',
  'Migrations, 3PL, subscriptions & the messy middle',
  'Real Core Web Vitals work, not checkbox SEO'
];

const FOCUS = [
  {
    icon: FiLayout,
    title: 'Themes & storefront',
    text: 'Dawn-based or fully custom OS 2.0, with sections your team can reuse without breaking layout.',
    tags: ['PDP / PLP / cart', 'Editor-friendly']
  },
  {
    icon: FiDatabase,
    title: 'Shopify platform',
    text: 'Markets, B2B, bundles, subscriptions and the quiet data work that keeps orders moving.',
    tags: ['Metafields', 'Automation']
  },
  {
    icon: FiZap,
    title: 'Apps & integrations',
    text: 'Private apps, webhooks and middleware that wire Shopify to ERPs, 3PLs and email without fragile hacks.',
    tags: ['GraphQL', 'Webhooks']
  }
];

const About = () => (
  <section id="about" className="section">
    <div className="container">
      <SectionHeader eyebrow="About me" title="Shopify is the product." accent="I ship the parts merchants touch." />

      <div className="bento">
        <motion.article className="card bento__intro" {...reveal}>
          <div className="avatar-badge" aria-hidden>
            SM
          </div>
          <h3>Hi, I&apos;m Suhail 👋</h3>
          <p>
            Most of my week is spent in the Shopify admin, the theme editor and the code behind both. I work
            with brands that have outgrown a template, need a careful migration, or hit a limit where Liquid,
            the Storefront API or a small app is the right answer, not another page builder stacked on top.
          </p>
          <p>
            I care about how your store feels on a phone, how checkout behaves under discounts and shipping
            rules, and how easy it is for your team to keep things tidy after launch.
          </p>
          <button type="button" className="btn btn--ink" onClick={() => startProject()}>
            Tell me about your store
          </button>
        </motion.article>

        <motion.div className="bento__stats" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          {STATS.map((s) => (
            <div key={s.label} className="card stat">
              <span className="stat__num">
                <Counter to={s.to} suffix={s.suffix} />
              </span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.article className="card card--forest bento__cares" {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <span className="eyebrow eyebrow--light">What I obsess over</span>
          <ul className="checklist">
            {CARES.map((c) => (
              <li key={c}>
                <span className="checklist__tick">
                  <FiCheck />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </motion.article>

        {FOCUS.map((f, i) => (
          <motion.article
            key={f.title}
            className="card focus"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 + i * 0.08 }}
          >
            <span className="focus__icon">
              <f.icon />
            </span>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
            <div className="tags">
              {f.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default About;
