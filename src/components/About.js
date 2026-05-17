import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCode, FaShopify, FaPlug } from 'react-icons/fa';

const About = () => {
  const features = [
    'Online Store 2.0 themes and section architecture',
    'Custom and private Shopify apps when off-the-shelf is not enough',
    'Metafields, metaobjects, and clean content models',
    'Migrations, 3PL, subscriptions, and the messy middle',
    'Performance: real Core Web Vitals work, not checkbox SEO'
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">Shopify is the product; I ship the parts merchants touch</p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Hi, I&apos;m Suhail Majeed</h3>
            <p>
              Most of my week is in the Shopify admin, the theme editor, and the codebase behind both.
              I work with brands that have outgrown a template, need a careful migration, or hit a limit
              where Liquid, the Storefront API, or a small app is the right answer—not another page builder
              stacked on top.
            </p>
            <p>
              I care about how the store feels on a phone, how checkout behaves under discounts and
              shipping rules, and how editors actually maintain the site after launch. If you are hiring
              for Shopify-only work, you are in the right place.
            </p>

            <div className="about-features">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FaCheckCircle className="feature-icon" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="about-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('#portfolio');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See recent builds
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Tell me about your store
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-cards">
              <motion.div
                className="about-card primary"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header">
                  <FaCode className="card-icon" />
                  <h4>Themes &amp; storefront</h4>
                </div>
                <div className="card-content">
                  <p>Dawn-based or fully custom OS 2.0, with sections merchants can reuse without breaking layout</p>
                  <div className="card-stats">
                    <span>PDP, PLP, cart</span>
                    <span>Editor-friendly</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="about-card secondary"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header">
                  <FaShopify className="card-icon" />
                  <h4>Shopify platform</h4>
                </div>
                <div className="card-content">
                  <p>Markets, B2B, bundles, subscriptions handoffs, and the boring data work that keeps orders moving</p>
                  <div className="card-stats">
                    <span>Metafields</span>
                    <span>Automation</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="about-card accent"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header">
                  <FaPlug className="card-icon" />
                  <h4>Apps &amp; integrations</h4>
                </div>
                <div className="card-content">
                  <p>Private apps, middleware, webhooks, and wiring Shopify to ERPs, 3PLs, and email without fragile hacks</p>
                  <div className="card-stats">
                    <span>GraphQL</span>
                    <span>Webhooks</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
