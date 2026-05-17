import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShopify,
  FaExchangeAlt,
  FaPuzzlePiece,
  FaTruck,
  FaTachometerAlt,
  FaHandshake,
  FaCog,
  FaArrowRight
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaShopify,
      title: 'Themes & UX on Shopify',
      description:
        'Online Store 2.0 builds, section libraries, PDP/PLP patterns, and cart flows that match how your team actually merchandises.',
      features: [
        'Custom or Dawn-based themes',
        'Editor-safe sections and presets',
        'Mobile-first layout and typography',
        'Accessible components and forms',
        'Internationalization with Markets',
        'Launch checklist and QA pass'
      ],
      color: '#96bf48',
      gradient: 'linear-gradient(135deg, #96bf48 0%, #5c8f3e 100%)'
    },
    {
      icon: FaExchangeAlt,
      title: 'Migrations & replatforming',
      description:
        'Moving off WooCommerce, Magento, or an older Shopify theme without losing URLs, customers, or order history you still need.',
      features: [
        'URL and redirect planning',
        'Product, customer, and order imports',
        '301 map and Search Console handoff',
        'Payment and tax sanity check',
        'Parallel run before DNS cutover',
        'Post-launch monitoring window'
      ],
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
    },
    {
      icon: FaPuzzlePiece,
      title: 'Custom & private apps',
      description:
        'When Flow, discounts, or an existing app cannot cover the edge case: tight Admin API usage, webhooks, and serverless workers.',
      features: [
        'Admin GraphQL mutations and reads',
        'Idempotent webhook handlers',
        'Bulk operations for large catalogs',
        'Embedded admin with App Bridge',
        'Secrets, rotation, and logging',
        'Documentation your team can run'
      ],
      color: '#0d9488',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)'
    },
    {
      icon: FaTruck,
      title: 'Ops integrations',
      description:
        'Shopify talking cleanly to 3PL, ERP, subscriptions, and email—fewer CSVs, fewer “we think it synced” moments.',
      features: [
        'Inventory and fulfillment sync',
        'Carrier accounts and rate logic',
        'Subscription platform handoffs',
        'Klaviyo / ESP event hygiene',
        'Fraud and payment edge cases',
        'Runbooks for support'
      ],
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      icon: FaTachometerAlt,
      title: 'Performance & measurement',
      description:
        'Theme-side speed work, third-party script audits, and analytics that still respect consent and checkout constraints.',
      features: [
        'Real-device profiling, not vanity scores',
        'Script removal and defer strategy',
        'GA4 / pixel placement review',
        'Search and filtering that scales',
        'Image and video delivery pass',
        'Monitoring after app changes'
      ],
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
    },
    {
      icon: FaHandshake,
      title: 'Retainers & partner support',
      description:
        'For teams that want a Shopify-native developer on Slack for fixes, small features, and pre-sale technical questions.',
      features: [
        'Monthly hours with clear scope',
        'Theme and app incident response',
        'Staging → production discipline',
        'Office hours with stakeholders',
        'Handover notes for internal devs',
        'Roadmap grooming for Shopify'
      ],
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What I take on</h2>
          <p className="section-subtitle">Shopify-only engagements, scoped like a product team</p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="service-header">
                <div
                  className="service-icon"
                  style={{
                    background: service.gradient,
                    color: 'white'
                  }}
                >
                  <service.icon />
                </div>
                <h3>{service.title}</h3>
              </div>

              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                  >
                    <FaCog className="feature-icon" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                className="service-btn"
                style={{
                  background: service.gradient,
                  color: 'white',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discuss this
                <FaArrowRight className="btn-icon" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cta-content">
            <h3>Have a messy brief?</h3>
            <p>
              Send the store URL, what is broken or missing, and any hard dates. I will reply with what belongs in
              Liquid, what belongs in an app, and what should stay in ops.
            </p>
            <div className="cta-buttons">
              <motion.button
                type="button"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Email a scope
              </motion.button>
              <motion.button
                type="button"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse work samples
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
