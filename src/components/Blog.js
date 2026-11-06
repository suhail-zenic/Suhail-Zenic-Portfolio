import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, startProject } from './utils';

const POSTS = [
  {
    id: 1,
    title: 'When a metafield should be a metaobject',
    excerpt:
      'A rule of thumb for merchandising data that’s reused across PDP, PLP and cart, and how to keep the editor experience sane.',
    category: 'Platform',
    date: 'Jan 8, 2026',
    readTime: '6 min',
    tags: ['Metafields', 'Metaobjects', 'Editor UX']
  },
  {
    id: 2,
    title: 'Cart.js is not a trash can',
    excerpt:
      'Why stacking third-party cart drawers breaks discounts, and how I sequence subscription apps, free gifts and Shopify Functions.',
    category: 'Themes',
    date: 'Dec 18, 2025',
    readTime: '7 min',
    tags: ['Cart', 'Subscriptions', 'Apps']
  },
  {
    id: 3,
    title: '301 maps that survive migrations',
    excerpt:
      'What I export before DNS flips, how I test redirects with real query strings, and the Search Console checks I run after go-live.',
    category: 'Ops',
    date: 'Dec 2, 2025',
    readTime: '8 min',
    tags: ['Migration', 'SEO', 'Redirects']
  },
  {
    id: 4,
    title: 'Webhook retries that don’t double-charge',
    excerpt:
      'Idempotency keys, HMAC verification and the boring logging that keeps Ops calm when Shopify replays orders/updated at 2 a.m.',
    category: 'Apps',
    date: 'Nov 20, 2025',
    readTime: '9 min',
    tags: ['Webhooks', 'Node', 'Reliability']
  },
  {
    id: 5,
    title: 'Removing scripts without breaking pixels',
    excerpt:
      'A practical pass for legacy scripts, consent banners and tag managers, measured on hardware your customers actually use.',
    category: 'Themes',
    date: 'Nov 6, 2025',
    readTime: '6 min',
    tags: ['Performance', 'Pixels', 'Privacy']
  },
  {
    id: 6,
    title: 'B2B catalogs: what to lock first',
    excerpt:
      'Company locations vs. tags, how price lists interact with retail promos, and the Liquid guards that keep wholesale and retail apart.',
    category: 'Platform',
    date: 'Oct 22, 2025',
    readTime: '10 min',
    tags: ['B2B', 'Plus', 'Liquid']
  }
];

const CATEGORIES = ['All', 'Themes', 'Platform', 'Apps', 'Ops'];

const Blog = () => {
  const [cat, setCat] = useState('All');
  const list = useMemo(() => (cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat)), [cat]);

  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="section-head-row">
          <SectionHeader eyebrow="Field notes" title="Things I've" accent="learned the hard way">
            Short write-ups I share with clients. Full posts are on the way.
          </SectionHeader>
          <div className="chips" role="group" aria-label="Filter notes">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${cat === c ? 'is-active' : ''}`}
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul className="notes" layout>
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li
                key={p.id}
                layout
                className="note"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="note__num mono">{String(p.id).padStart(2, '0')}</span>
                <div className="note__body">
                  <div className="note__meta mono">
                    <span className="note__cat">{p.category}</span>
                    <span>{p.date}</span>
                    <span>{p.readTime} read</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
                <div className="note__tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="notes__cta">
          Want these as a monthly Shopify digest?{' '}
          <button type="button" className="link-btn" onClick={() => startProject('Newsletter: count me in')}>
            Let me know →
          </button>
        </p>
      </div>
    </section>
  );
};

export default Blog;
