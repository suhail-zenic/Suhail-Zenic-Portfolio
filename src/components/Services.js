import React from 'react';
import { motion } from 'framer-motion';
import { FiLayout, FiRepeat, FiBox, FiTruck, FiTrendingUp, FiUsers, FiPlus, FiCheck } from 'react-icons/fi';
import { SectionHeader, reveal, startProject } from './utils';

const SERVICES = [
  {
    icon: FiLayout,
    title: 'Themes & storefront UX',
    tag: 'Most popular',
    description:
      'Online Store 2.0 builds, section libraries, PDP/PLP patterns and cart flows that match how your team actually merchandises.',
    features: ['Custom or Dawn-based themes', 'Editor-safe sections & presets', 'Mobile-first layout', 'Accessible components', 'Markets & translations', 'Launch QA checklist'],
    tone: 'lime'
  },
  {
    icon: FiRepeat,
    title: 'Migrations & replatforming',
    description:
      'Moving off WooCommerce, Magento or an older theme without losing URLs, customers or the order history you still need.',
    features: ['URL & redirect planning', 'Product, customer & order imports', '301 map + Search Console', 'Payment & tax sanity check', 'Parallel run before cutover', 'Post-launch monitoring'],
    tone: 'coral'
  },
  {
    icon: FiBox,
    title: 'Custom & private apps',
    description:
      'When Flow, discounts or an existing app can’t cover the edge case: tight Admin API usage, webhooks and serverless workers.',
    features: ['Admin GraphQL reads & writes', 'Idempotent webhook handlers', 'Bulk ops for large catalogs', 'Embedded admin (App Bridge)', 'Secrets, rotation & logging', 'Docs your team can run'],
    tone: 'sky'
  },
  {
    icon: FiTruck,
    title: 'Ops integrations',
    description:
      'Shopify talking cleanly to 3PL, ERP, subscriptions and email. Fewer CSVs, fewer “we think it synced” moments.',
    features: ['Inventory & fulfillment sync', 'Carrier accounts & rates', 'Subscription handoffs', 'Klaviyo / ESP event hygiene', 'Fraud & payment edge cases', 'Support runbooks'],
    tone: 'sun'
  },
  {
    icon: FiTrendingUp,
    title: 'Speed & measurement',
    description:
      'Theme-side speed work, third-party script audits and analytics that still respect consent and checkout rules.',
    features: ['Real-device profiling', 'Script removal & defer plan', 'GA4 / pixel review', 'Search & filtering that scales', 'Image & video delivery', 'Monitoring after app changes'],
    tone: 'lilac'
  },
  {
    icon: FiUsers,
    title: 'Retainers & partner support',
    description:
      'A Shopify-native developer on Slack for fixes, small features and pre-sale technical questions.',
    features: ['Monthly hours, clear scope', 'Theme & app incident response', 'Staging → production discipline', 'Stakeholder office hours', 'Handover notes', 'Shopify roadmap grooming'],
    tone: 'mint'
  }
];

const Services = () => (
  <section id="services" className="section section--tint">
    <div className="container">
      <SectionHeader eyebrow="Services" title="Pick what you need." accent="I'll handle the rest." align="center">
        Shopify-only engagements, scoped like a product team. Tap <strong>Add to project</strong> and I&apos;ll
        pre-fill the contact form for you.
      </SectionHeader>

      <div className="services">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            className={`card service service--${s.tone}`}
            {...reveal}
            transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
          >
            <div className="service__top">
              <span className="service__icon">
                <s.icon />
              </span>
              {s.tag && <span className="badge">{s.tag}</span>}
            </div>
            <h3>{s.title}</h3>
            <p className="service__desc">{s.description}</p>
            <ul className="service__list">
              {s.features.map((f) => (
                <li key={f}>
                  <FiCheck aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <button type="button" className="service__add" onClick={() => startProject(s.title)}>
              <FiPlus aria-hidden /> Add to project
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
