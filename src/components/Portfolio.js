import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiLock } from 'react-icons/fi';
import { FaShopify } from 'react-icons/fa';
import { SectionHeader, reveal, startProject } from './utils';

/** Smaller shots = quicker first paint; mshots first (usually cached well), thum as backup. */
const screenshotSources = (url) => {
  const enc = encodeURIComponent(url);
  return [
    `https://s0.wp.com/mshots/v1/${enc}?w=800`,
    `https://image.thum.io/get/width/800/crop/600/noanimate/${enc}`
  ];
};

export const hostLabel = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const monogram = (name) => name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase() || '—';

const plate = (hex) => `linear-gradient(160deg, ${hex} 0%, ${hex}cc 55%, #16150f 100%)`;

const StorePreview = ({ url, accent, name, priority }) => {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const sources = useMemo(() => screenshotSources(url), [url]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (priority || shouldLoad) return undefined;
    const node = rootRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [priority, shouldLoad]);

  useLayoutEffect(() => {
    const el = imgRef.current;
    if (shouldLoad && el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [shouldLoad, sourceIndex]);

  if (sourceIndex >= sources.length) {
    return (
      <div className="shot" ref={rootRef}>
        <div className="shot__plate" style={{ background: plate(accent) }} aria-hidden>
          <FaShopify className="shot__fallback-icon" />
          <span className="shot__mono">{monogram(name)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="shot" ref={rootRef}>
      <div className={`shot__plate ${loaded ? 'shot__plate--hide' : ''}`} style={{ background: plate(accent) }} aria-hidden>
        <span className="shot__mono">{monogram(name)}</span>
      </div>
      {shouldLoad && (
        <img
          ref={imgRef}
          key={`${url}-${sourceIndex}`}
          src={sources[sourceIndex]}
          alt={`Homepage of ${name}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={800}
          height={600}
          className={`shot__img ${loaded ? 'shot__img--show' : ''}`}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth === 0) {
              setSourceIndex((i) => i + 1);
              return;
            }
            setLoaded(true);
          }}
          onError={() => {
            setLoaded(false);
            setSourceIndex((i) => i + 1);
          }}
        />
      )}
    </div>
  );
};

export const STORES = [
  {
    id: 'taruni',
    name: 'Taruni',
    url: 'https://www.taruni.in/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Ethnic wear. Collections and checkout tuned for phones.',
    accent: '#7c3aed'
  },
  {
    id: 'malika',
    name: 'Malika Clothing',
    url: 'https://www.malikaclothing.qa/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Qatar store with Arabic/English paths and tidy payments.',
    accent: '#0d9488'
  },
  {
    id: 'naaribya',
    name: 'Naaribya by Dr Rak Nair',
    url: 'https://www.naaribyardraknair.com/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Fashion brand: homepage story, collections and PDP cleanup.',
    accent: '#c2410c'
  },
  {
    id: 'flyhoch',
    name: 'Flyhoch',
    url: 'https://www.flyhoch.com/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Apparel with flexible sections so the team can swap promos without a dev.',
    accent: '#2563eb'
  },
  {
    id: 'gocs',
    name: 'GOCS',
    url: 'https://gocs.shop/',
    category: 'food',
    categoryLabel: 'Food & drink',
    blurb: 'Food ordering: menus, cart and fulfillment-friendly SKUs.',
    accent: '#ca8a04'
  },
  {
    id: 'domnom',
    name: 'Domnom',
    url: 'https://www.domnom.in/',
    category: 'food',
    categoryLabel: 'Food & drink',
    blurb: 'A quick path from landing page to checkout on mobile.',
    accent: '#dc2626'
  },
  {
    id: 'sreeyang',
    name: 'Sreeyang',
    url: 'https://www.sreeyang.com/',
    category: 'home',
    categoryLabel: 'Home decor',
    blurb: 'Curtains & decor with room-led browsing and clear size options.',
    accent: '#4f46e5'
  }
];

const FILTERS = [
  { key: 'all', label: 'All stores' },
  { key: 'clothing', label: 'Clothing' },
  { key: 'food', label: 'Food & drink' },
  { key: 'home', label: 'Home decor' }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => (filter === 'all' ? STORES : STORES.filter((s) => s.category === filter)), [filter]);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <div className="section-head-row">
          <SectionHeader eyebrow="Selected work" title="Live stores," accent="real customers">
            Every one of these is open for business right now. Click through and try them on your phone.
          </SectionHeader>

          <div className="chips" role="group" aria-label="Filter stores">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`chip ${filter === f.key ? 'is-active' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
                <span className="chip__count">
                  {f.key === 'all' ? STORES.length : STORES.filter((s) => s.category === f.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <motion.div className="work-grid" layout>
          <AnimatePresence mode="popLayout">
            {list.map((store, idx) => (
              <motion.a
                layout
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`work ${idx === 0 && filter === 'all' ? 'work--wide' : ''}`}
                style={{ '--accent': store.accent }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="browser">
                  <div className="browser__bar">
                    <span className="browser__dots" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="browser__url">
                      <FiLock aria-hidden /> {hostLabel(store.url)}
                    </span>
                  </div>
                  <div className="browser__view">
                    <StorePreview url={store.url} accent={store.accent} name={store.name} priority={idx < 3} />
                  </div>
                </div>

                <div className="work__meta">
                  <div>
                    <span className="work__cat">{store.categoryLabel}</span>
                    <h3 className="work__title">{store.name}</h3>
                    <p className="work__blurb">{store.blurb}</p>
                  </div>
                  <span className="work__arrow" aria-hidden>
                    <FiArrowUpRight />
                  </span>
                </div>
                <span className="sr-only">(opens in a new tab)</span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div className="banner" {...reveal}>
          <div>
            <h3>
              Want your store <em className="serif-accent">here</em> next?
            </h3>
            <p>Tell me what is broken or missing and when you need it. I&apos;ll tell you honestly if I&apos;m the right fit.</p>
          </div>
          <button type="button" className="btn btn--accent btn--lg" onClick={() => startProject()}>
            Start a conversation <FiArrowUpRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
