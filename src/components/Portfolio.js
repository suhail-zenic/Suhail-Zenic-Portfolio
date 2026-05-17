import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaShopify } from 'react-icons/fa';

/** Smaller shots = quicker first paint; mshots first (usually cached well), thum as backup. */
const screenshotSources = (url) => {
  const enc = encodeURIComponent(url);
  return [
    `https://s0.wp.com/mshots/v1/${enc}?w=560`,
    `https://image.thum.io/get/width/560/crop/420/noanimate/${enc}`
  ];
};

const hostLabel = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const storeMonogram = (name) => {
  const letters = name.replace(/[^\p{L}\p{N}]/gu, '');
  return letters.slice(0, 2).toUpperCase() || '—';
};

const plateGradient = (hex) =>
  `linear-gradient(168deg, ${hex}55 0%, #0a0f1a 42%, #020617 100%)`;

const StorePreview = ({ url, accent, name, priority }) => {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const prevUrlRef = useRef(null);
  const sources = useMemo(() => screenshotSources(url), [url]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (priority || shouldLoad) return;
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '180px 0px', threshold: 0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [priority, shouldLoad]);

  useEffect(() => {
    if (prevUrlRef.current !== null && prevUrlRef.current !== url) {
      setSourceIndex(0);
      setLoaded(false);
    }
    prevUrlRef.current = url;
  }, [url]);

  useLayoutEffect(() => {
    if (!shouldLoad || sourceIndex >= sources.length) return;
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [shouldLoad, sourceIndex, sources.length, url]);

  const monogram = storeMonogram(name);

  if (sourceIndex >= sources.length) {
    return (
      <div className="store-card-preview-root" ref={rootRef}>
        <div className="store-card-preview-fallback" style={{ background: plateGradient(accent) }} aria-hidden>
          <FaShopify />
          <span>{hostLabel(url)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="store-card-preview-root" ref={rootRef}>
      <div
        className={`store-card-preview-plate ${loaded ? 'store-card-preview-plate--hide' : ''}`}
        style={{ background: plateGradient(accent) }}
        aria-hidden
      >
        <span className="store-card-preview-mono">{monogram}</span>
      </div>
      {shouldLoad && (
        <img
          ref={imgRef}
          key={`${url}-${sourceIndex}`}
          src={sources[sourceIndex]}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding="async"
          width={560}
          height={354}
          className={`store-card-preview-img ${loaded ? 'store-card-preview-img--show' : ''}`}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth === 0) {
              setLoaded(false);
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
      <span className="store-card-preview-veil" aria-hidden />
    </div>
  );
};

const STORES = [
  {
    id: 'taruni',
    name: 'Taruni',
    url: 'https://www.taruni.in/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Ethnic wear—collections and checkout tuned for phones.',
    accent: '#7c3aed'
  },
  {
    id: 'malika',
    name: 'Malika Clothing',
    url: 'https://www.malikaclothing.qa/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Qatar store—catalog, Arabic/English paths, payments tidy.',
    accent: '#0d9488'
  },
  {
    id: 'naaribya',
    name: 'Naaribya by Dr Rak Nair',
    url: 'https://www.naaribyardraknair.com/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Fashion brand—homepage story, collections, PDP cleanup.',
    accent: '#c2410c'
  },
  {
    id: 'flyhoch',
    name: 'Flyhoch',
    url: 'https://www.flyhoch.com/',
    category: 'clothing',
    categoryLabel: 'Clothing',
    blurb: 'Apparel—flexible sections so the team can swap promos without dev.',
    accent: '#2563eb'
  },
  {
    id: 'gocs',
    name: 'GOCS',
    url: 'https://gocs.shop/',
    category: 'food',
    categoryLabel: 'Food & beverages',
    blurb: 'Food ordering—menus, cart, and fulfillment-friendly SKUs.',
    accent: '#ca8a04'
  },
  {
    id: 'domnom',
    name: 'Domnom',
    url: 'https://www.domnom.in/',
    category: 'food',
    categoryLabel: 'Food & beverages',
    blurb: 'Domnom—quick path from landing to checkout on mobile.',
    accent: '#dc2626'
  },
  {
    id: 'sreeyang',
    name: 'Sreeyang',
    url: 'https://www.sreeyang.com/',
    category: 'home',
    categoryLabel: 'Curtains & home decor',
    blurb: 'Curtains & decor—room-led browsing and clear size options.',
    accent: '#4f46e5'
  }
];

const FILTERS = [
  { key: 'all', label: 'All stores' },
  { key: 'clothing', label: 'Clothing' },
  { key: 'food', label: 'Food & beverages' },
  { key: 'home', label: 'Curtains & home' }
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(
    () => (activeFilter === 'all' ? STORES : STORES.filter((s) => s.category === activeFilter)),
    [activeFilter]
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.18 }
    }
  };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Live Shopify stores</h2>
          <p className="section-subtitle">
            Real sites, live links. Thumbnails are auto-grabs—tap through if you want the full experience.
          </p>
        </motion.div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {FILTERS.map((filter) => (
            <motion.button
              key={filter.key}
              type="button"
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio-grid store-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((store, idx) => (
              <motion.article
                key={store.id}
                layout
                className="portfolio-item store-card"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -4 }}
                transition={{ type: 'tween', duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ '--store-accent': store.accent }}
              >
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-card-media"
                  aria-label={`Open ${store.name} in a new tab`}
                >
                  <StorePreview
                    url={store.url}
                    accent={store.accent}
                    name={store.name}
                    priority={idx < 3}
                  />
                  <span className="store-card-category">{store.categoryLabel}</span>
                  <span className="store-card-open">
                    <FaExternalLinkAlt aria-hidden />
                    Open site
                  </span>
                </a>

                <div className="store-card-body">
                  <h3 className="store-card-title">{store.name}</h3>
                  <p className="store-card-host">{hostLabel(store.url)}</p>
                  <p className="store-card-blurb">{store.blurb}</p>
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-card-cta"
                  >
                    Visit live store
                    <FaExternalLinkAlt aria-hidden />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="portfolio-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="cta-content">
            <h3>Want your store here?</h3>
            <p>Tell me what is broken or missing and when you need it—I will say if I can take it on.</p>
            <motion.button
              type="button"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a conversation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
