import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { SectionHeader, reveal } from './utils';

const TESTIMONIALS = [
  {
    name: 'Nina Okafor',
    position: 'Founder',
    company: 'Northline Supply Co.',
    text: 'We were drowning in metafields after a migration. Suhail untangled the models, fixed the theme so editors stopped breaking the PLP, and wrote a one-page guide our VA actually uses.',
    project: 'Migration + OS 2.0 cleanup',
    tone: 'lime'
  },
  {
    name: 'Leo Park',
    position: 'Head of eCommerce',
    company: 'Fieldkind Outdoors',
    text: 'He did the unglamorous stuff: cart edge cases with bundles, script cleanup, and a 3PL sync that stopped overselling on launch weekend. Shopify finally feels boring, in a good way.',
    project: 'Launch hardening',
    tone: 'coral'
  },
  {
    name: 'Amelia Rhodes',
    position: 'Ops lead',
    company: 'Studio Lumen',
    text: 'We needed Plus B2B without confusing retail customers. Catalog rules, draft orders and a theme pass for logged-in buyers, all documented for our finance team.',
    project: 'Shopify Plus B2B',
    tone: 'sky'
  },
  {
    name: 'Marcus Iyer',
    position: 'CTO (contract)',
    company: 'Brightline Retail Group',
    text: 'Shipped a private app for nightly inventory pulls with proper webhook retries. When the warehouse API hiccuped, we had logs and backoff, not silent drift.',
    project: 'Private inventory app',
    tone: 'sun'
  }
];

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[idx];

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(timer);
  }, [paused]);

  const step = (d) => setIdx((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="section section--ink">
      <div className="container">
        <SectionHeader eyebrow="Kind words" title="Merchants say it" accent="better than I can" />

        <motion.div
          className="quotes"
          {...reveal}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="quote">
            <span className="quote__mark" aria-hidden>
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} aria-hidden />
                  ))}
                </div>
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <span className={`avatar avatar--${t.tone}`} aria-hidden>
                    {initials(t.name)}
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>
                      {t.position}, {t.company}
                    </small>
                  </span>
                  <span className="quote__project mono">{t.project}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="quote__controls">
              <button type="button" className="icon-btn icon-btn--light" onClick={() => step(-1)} aria-label="Previous testimonial">
                <FiArrowLeft />
              </button>
              <span className="mono quote__count">
                {String(idx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
              <button type="button" className="icon-btn icon-btn--light" onClick={() => step(1)} aria-label="Next testimonial">
                <FiArrowRight />
              </button>
            </div>
          </div>

          <ul className="quote-list">
            {TESTIMONIALS.map((q, i) => (
              <li key={q.name}>
                <button
                  type="button"
                  className={`quote-list__item ${i === idx ? 'is-active' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-pressed={i === idx}
                >
                  <span className={`avatar avatar--sm avatar--${q.tone}`} aria-hidden>
                    {initials(q.name)}
                  </span>
                  <span>
                    <strong>{q.name}</strong>
                    <small>{q.company}</small>
                  </span>
                  {i === idx && !paused && <span className="quote-list__progress" key={idx} />}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="quotes__note">References available on request, especially for Plus, B2B or custom app projects.</p>
      </div>
    </section>
  );
};

export default Testimonials;
