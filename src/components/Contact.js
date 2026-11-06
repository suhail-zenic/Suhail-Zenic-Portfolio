import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGlobe, FiSend, FiCheck, FiCopy } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { reveal } from './utils';

const EMAIL = 'suhail.codes99@gmail.com';
const PHONE = '+917736132338';

const BASE_TOPICS = [
  'Themes & storefront UX',
  'Migrations & replatforming',
  'Custom & private apps',
  'Ops integrations',
  'Speed & measurement',
  'Retainers & partner support',
  'Something else'
];

export const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/suhail-zenic', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/suhail-majeed-449478369', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com/suhailzenic', label: 'X' },
  { icon: FaInstagram, href: 'https://www.instagram.com/just_suhaail', label: 'Instagram' }
];

const Contact = () => {
  const [topics, setTopics] = useState(BASE_TOPICS);
  const [picked, setPicked] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', store: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onPrefill = (e) => {
      const topic = e.detail;
      setTopics((t) => (t.includes(topic) ? t : [...t, topic]));
      setPicked((p) => (p.includes(topic) ? p : [...p, topic]));
    };
    window.addEventListener('prefill-contact', onPrefill);
    return () => window.removeEventListener('prefill-contact', onPrefill);
  }, []);

  const toggle = (t) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Shopify project${picked.length ? `: ${picked.join(', ')}` : ''} (from ${form.name})`;
    const body = [
      `Hi Suhail,`,
      ``,
      form.message,
      ``,
      `Store: ${form.store || 'n/a'}`,
      `Interested in: ${picked.join(', ') || 'n/a'}`,
      ``,
      `${form.name}`,
      `${form.email}`
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div className="contact__panel" {...reveal}>
          <div className="contact__intro">
            <span className="eyebrow eyebrow--light">Contact</span>
            <h2>
              Let&apos;s make your store <em className="serif-accent">easier to love.</em>
            </h2>
            <p>
              A store link, your role and what&apos;s on fire is plenty for a first reply. For bugs, add the steps to
              reproduce and whether it happens on Dawn or a custom theme.
            </p>

            <ul className="contact__lines">
              <li>
                <FiMail aria-hidden />
                <a href={`mailto:${EMAIL}`}>
                  {EMAIL.split('@')[0]}
                  <wbr />@{EMAIL.split('@')[1]}
                </a>
                <button type="button" className="mini-btn" onClick={copyEmail} aria-label="Copy email address">
                  {copied ? <FiCheck /> : <FiCopy />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </li>
              <li>
                <FiPhone aria-hidden />
                <a href={`tel:${PHONE}`}>+91 77361 32338</a>
              </li>
              <li>
                <FiGlobe aria-hidden />
                <span>Remote, working with merchants worldwide</span>
              </li>
            </ul>

            <div className="socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social">
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <fieldset className="form__topics">
              <legend>What can I help with?</legend>
              <div className="chips">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`chip chip--form ${picked.includes(t) ? 'is-active' : ''}`}
                    aria-pressed={picked.includes(t)}
                    onClick={() => toggle(t)}
                  >
                    {picked.includes(t) && <FiCheck aria-hidden />}
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="form__row">
              <label className="field">
                <span>Your name</span>
                <input name="name" value={form.name} onChange={onChange} required autoComplete="name" placeholder="Jane Doe" />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  placeholder="jane@brand.com"
                />
              </label>
            </div>

            <label className="field">
              <span>
                Store URL <em>(optional)</em>
              </span>
              <input name="store" value={form.store} onChange={onChange} placeholder="yourstore.myshopify.com" />
            </label>

            <label className="field">
              <span>Tell me a little more</span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                required
                placeholder="What you've tried, your Shopify plan and any deadline"
              />
            </label>

            <button type="submit" className="btn btn--accent btn--lg btn--block">
              {sent ? (
                <>
                  <FiCheck /> Opening your email app…
                </>
              ) : (
                <>
                  Send message <FiSend />
                </>
              )}
            </button>
            <p className="form__hint">
              This opens your email app with everything filled in, so nothing gets lost in a form inbox.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
