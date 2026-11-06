import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLayers, FiDatabase, FiCpu, FiActivity } from 'react-icons/fi';
import { SectionHeader, reveal } from './utils';

const CATEGORIES = [
  {
    key: 'storefront',
    title: 'Themes & storefront',
    icon: FiLayers,
    blurb: 'Layouts that survive real catalogs, promos and mobile traffic, not just the mockups.',
    skills: [
      { name: 'Liquid & OS 2.0 sections', level: 95 },
      { name: 'JSON templates & navigation', level: 90 },
      { name: 'Cart, discounts & line item properties', level: 88 },
      { name: 'Storefront API & headless handoffs', level: 82 }
    ]
  },
  {
    key: 'platform',
    title: 'Admin & data',
    icon: FiDatabase,
    blurb: 'Clean content models so merchandisers can move fast without calling a developer.',
    skills: [
      { name: 'Metafields & metaobjects', level: 92 },
      { name: 'Markets, taxes & selling internationally', level: 85 },
      { name: 'Shopify Flow & automation', level: 84 },
      { name: 'B2B catalogs & price lists', level: 80 }
    ]
  },
  {
    key: 'apps',
    title: 'Apps & backend',
    icon: FiCpu,
    blurb: 'ERP, 3PL, subscriptions and email: fewer moving parts and clear ownership when something breaks.',
    skills: [
      { name: 'Webhooks & idempotent workers', level: 90 },
      { name: 'Admin GraphQL & bulk operations', level: 88 },
      { name: 'Private apps & middleware', level: 86 },
      { name: 'App Bridge & embedded admin UX', level: 82 }
    ]
  },
  {
    key: 'delivery',
    title: 'Launch quality',
    icon: FiActivity,
    blurb: 'I trim scripts, fix render-blocking paths and retest after every app install.',
    skills: [
      { name: 'Core Web Vitals on the theme', level: 88 },
      { name: 'Theme Check & CI for Liquid', level: 85 },
      { name: 'Analytics, pixels & consent', level: 83 },
      { name: 'Checkout extensibility', level: 78 }
    ]
  }
];

const Skills = () => {
  const [active, setActive] = useState(CATEGORIES[0].key);
  const cat = CATEGORIES.find((c) => c.key === active);

  return (
    <section id="skills" className="section section--tint">
      <div className="container">
        <SectionHeader eyebrow="Toolbox" title="My Shopify" accent="stack">
          Where my time goes on a typical build. Pick a lane to see the details.
        </SectionHeader>

        <motion.div className="stack" {...reveal}>
          <div className="stack__tabs" role="tablist" aria-label="Skill categories">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={active === c.key}
                className={`stack__tab ${active === c.key ? 'is-active' : ''}`}
                onClick={() => setActive(c.key)}
              >
                <span className="mono">0{i + 1}</span>
                <c.icon />
                <span>{c.title}</span>
              </button>
            ))}
          </div>

          <div className="card stack__panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <p className="stack__blurb">{cat.blurb}</p>
                <ul className="meters">
                  {cat.skills.map((s, i) => (
                    <li key={s.name} className="meter">
                      <div className="meter__row">
                        <span>{s.name}</span>
                        <span className="mono">{s.level}</span>
                      </div>
                      <div className="meter__track">
                        <motion.div
                          className="meter__fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
