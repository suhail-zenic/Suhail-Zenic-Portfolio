import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { scrollToId } from './utils';
import { SOCIALS } from './Contact';

const LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Stack', href: '#skills' },
  { name: 'Work', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Notes', href: '#blog' },
  { name: 'Contact', href: '#contact' }
];

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__top">
        <p className="footer__pitch">
          Independent Shopify developer building themes, custom apps, migrations and integrations for merchants and
          agencies worldwide.
        </p>
        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.href);
              }}
            >
              {l.name}
            </a>
          ))}
        </nav>
        <div className="socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social">
              <s.icon />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__word" aria-hidden>
        Suhail Majeed
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Suhail Majeed. Built with care and a lot of Liquid.</span>
        <button type="button" className="link-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <FiArrowUp />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
