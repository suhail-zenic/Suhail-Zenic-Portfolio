import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiShoppingBag } from 'react-icons/fi';
import { FaShopify } from 'react-icons/fa';
import { scrollToId, startProject } from './utils';

const LINE_ITEMS = [
  { name: 'Online Store 2.0 theme', note: 'Editor-safe sections', qty: 1 },
  { name: 'Custom Shopify app', note: 'Webhooks + Admin API', qty: 1 },
  { name: 'Store migration', note: '301s, customers, orders', qty: 1 },
  { name: 'Core Web Vitals pass', note: 'Faster on real phones', qty: 1 }
];

const TOASTS = [
  { store: 'Ka-ching!', text: 'New order placed' },
  { store: 'Checkout', text: 'Completed on mobile' },
  { store: 'Theme', text: 'Published without a hitch' },
  { store: 'Inventory', text: 'Synced with the warehouse' }
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
});

const Hero = () => {
  const [toast, setToast] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setToast((i) => (i + 1) % TOASTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden />
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.span className="pill pill--status" {...fade(0)}>
            <span className="pulse-dot" /> Freelance Shopify developer<span className="pill__extra"> · Available for projects</span>
          </motion.span>

          <motion.h1 className="hero__title" {...fade(0.08)}>
            I build Shopify stores people{' '}
            <span className="hero__love">
              <em className="serif-accent">love</em>
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M3 14 C 50 4, 120 4, 197 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: 'easeInOut' }}
                />
              </svg>
            </span>{' '}
            to buy from.
          </motion.h1>

          <motion.p className="hero__lede" {...fade(0.16)}>
            Hi, I&apos;m <strong>Suhail Majeed</strong>, an independent Shopify developer. I design and
            ship Online Store 2.0 themes, custom apps, migrations and the integrations your team
            relies on every day, so your store feels fast, looks sharp and just works.
          </motion.p>

          <motion.div className="hero__ctas" {...fade(0.24)}>
            <button type="button" className="btn btn--accent btn--lg" onClick={() => startProject()}>
              Start a project <FiArrowRight />
            </button>
            <button type="button" className="btn btn--ghost btn--lg" onClick={() => scrollToId('#portfolio')}>
              See live stores
            </button>
          </motion.div>

          <motion.ul className="hero__proof" {...fade(0.32)}>
            <li>
              <strong>28+</strong>
              <span>stores launched</span>
            </li>
            <li>
              <strong>18</strong>
              <span>merchants &amp; agencies</span>
            </li>
            <li>
              <strong>4+ yrs</strong>
              <span>Shopify only</span>
            </li>
          </motion.ul>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="receipt" role="img" aria-label="A playful order receipt listing the services Suhail offers">
            <div className="receipt__head">
              <div className="receipt__brand">
                <FaShopify /> <span>Order #SM-2026</span>
              </div>
              <span className="receipt__status">
                <FiCheck /> Fulfilled
              </span>
            </div>

            <p className="receipt__to mono">Ship to: your next big launch</p>

            <ul className="receipt__items">
              {LINE_ITEMS.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                >
                  <span className="receipt__qty mono">{item.qty}×</span>
                  <span className="receipt__name">
                    {item.name}
                    <small>{item.note}</small>
                  </span>
                  <FiCheck className="receipt__tick" />
                </motion.li>
              ))}
            </ul>

            <div className="receipt__total">
              <span>Total</span>
              <span className="serif-accent">A store that sells</span>
            </div>
            <div className="receipt__barcode" aria-hidden />
          </div>

          <div className="sticker" aria-hidden>
            <span>100%</span>
            <span>Liquid</span>
          </div>

          <div className="toast-wrap" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={toast}
                className="toast"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <span className="toast__icon">
                  <FiShoppingBag />
                </span>
                <span>
                  <strong>{TOASTS[toast].store}</strong>
                  <small>{TOASTS[toast].text}</small>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
