import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun, FiArrowUpRight } from 'react-icons/fi';
import { scrollToId } from './utils';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Clients', href: '#testimonials' },
  { name: 'Notes', href: '#blog' }
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.querySelector(i.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a
          href="#home"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault();
            go('#home');
          }}
        >
          <span className="nav__logo-mark">S</span>
          <span className="nav__logo-text">
            suhail<span className="nav__logo-dot">.</span>majeed
          </span>
        </a>

        <nav className="nav__links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav__link ${active === item.href ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <a
            href="#contact"
            className="btn btn--ink btn--sm nav__cta"
            onClick={(e) => {
              e.preventDefault();
              go('#contact');
            }}
          >
            Let&apos;s talk <FiArrowUpRight />
          </a>
          <button
            type="button"
            className="icon-btn nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {[...NAV_ITEMS, { name: 'Contact', href: '#contact' }].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="nav__sheet-link"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
              >
                <span className="mono">0{i + 1}</span>
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
