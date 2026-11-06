import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiPlus } from 'react-icons/fi';
import { SectionHeader, reveal, startProject } from './utils';
import { STORES, hostLabel } from './Portfolio';

/**
 * Real client quotes go here once clients have approved them, e.g.
 * { name: 'Full Name', role: 'Founder', store: 'Taruni', url: 'https://www.taruni.in/', text: '...' }
 * The quotes block only renders when this list has entries.
 */
const QUOTES = [];

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const Testimonials = () => (
  <section id="testimonials" className="section section--ink">
    <div className="container">
      <SectionHeader eyebrow="Clients" title="Brands I've" accent="built for">
        Real Shopify stores, live right now. Click any of them and see for yourself.
      </SectionHeader>

      <ul className="brands">
        {STORES.map((s, i) => (
          <motion.li key={s.id} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.06 }}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brand"
              style={{ '--accent': s.accent }}
            >
              <span className="brand__mono" aria-hidden>
                {initials(s.name)}
              </span>
              <span className="brand__name">{s.name}</span>
              <span className="brand__meta mono">
                {s.categoryLabel}
                <span className="brand__host"> · {hostLabel(s.url)}</span>
              </span>
              <FiArrowUpRight className="brand__arrow" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </motion.li>
        ))}
        <motion.li {...reveal} transition={{ ...reveal.transition, delay: 0.18 }}>
          <button type="button" className="brand brand--next" onClick={() => startProject()}>
            <span className="brand__mono" aria-hidden>
              <FiPlus />
            </span>
            <span className="brand__name">Your store?</span>
            <span className="brand__meta mono">Let&apos;s talk about it</span>
            <FiArrowUpRight className="brand__arrow" aria-hidden />
          </button>
        </motion.li>
      </ul>

      {QUOTES.length > 0 && (
        <div className="client-quotes">
          {QUOTES.map((q) => (
            <motion.figure key={q.name} className="client-quote" {...reveal}>
              <blockquote>&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption>
                <span className="client-quote__avatar" aria-hidden>
                  {initials(q.name)}
                </span>
                <span>
                  <strong>{q.name}</strong>
                  <small>
                    {q.role},{' '}
                    {q.url ? (
                      <a href={q.url} target="_blank" rel="noopener noreferrer">
                        {q.store}
                      </a>
                    ) : (
                      q.store
                    )}
                  </small>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}

      <p className="brands__note">
        Want to hear it from them? References are available on request.{' '}
        <button type="button" className="link-btn" onClick={() => startProject('Client references')}>
          Ask for a reference →
        </button>
      </p>
    </div>
  </section>
);

export default Testimonials;
