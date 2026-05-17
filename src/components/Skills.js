import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaShopify,
  FaCode,
  FaDatabase,
  FaPlug,
  FaTachometerAlt,
  FaLayerGroup
} from 'react-icons/fa';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('storefront');

  const skillCategories = {
    storefront: {
      title: 'Themes & storefront',
      icon: FaLayerGroup,
      skills: [
        { name: 'Liquid & OS 2.0 sections', level: 95, icon: FaCode, color: '#96bf48' },
        { name: 'JSON templates & navigation', level: 90, icon: FaShopify, color: '#96bf48' },
        { name: 'Cart, discounts, and line item properties', level: 88, icon: FaShopify, color: '#96bf48' },
        { name: 'Storefront API & headless handoffs', level: 82, icon: FaCode, color: '#96bf48' }
      ]
    },
    platform: {
      title: 'Merchant admin & data',
      icon: FaDatabase,
      skills: [
        { name: 'Metafields & metaobjects', level: 92, icon: FaDatabase, color: '#5c8f3e' },
        { name: 'Markets, taxes, and selling internationally', level: 85, icon: FaShopify, color: '#5c8f3e' },
        { name: 'B2B catalogs & price lists', level: 80, icon: FaShopify, color: '#5c8f3e' },
        { name: 'Shopify Flow & automation', level: 84, icon: FaShopify, color: '#5c8f3e' }
      ]
    },
    apps: {
      title: 'Apps & custom backend',
      icon: FaShopify,
      skills: [
        { name: 'Admin GraphQL & bulk operations', level: 88, icon: FaShopify, color: '#6366f1' },
        { name: 'Webhooks & idempotent workers', level: 90, icon: FaCode, color: '#6366f1' },
        { name: 'App Bridge & embedded admin UX', level: 82, icon: FaShopify, color: '#6366f1' },
        { name: 'Private apps & middleware', level: 86, icon: FaPlug, color: '#6366f1' }
      ]
    },
    delivery: {
      title: 'Launch quality',
      icon: FaTachometerAlt,
      skills: [
        { name: 'Core Web Vitals on the theme', level: 88, icon: FaTachometerAlt, color: '#0d9488' },
        { name: 'Theme Check & CI for Liquid', level: 85, icon: FaCode, color: '#0d9488' },
        { name: 'Analytics, pixels, and consent', level: 83, icon: FaPlug, color: '#0d9488' },
        { name: 'Checkout extensibility (where applicable)', level: 78, icon: FaShopify, color: '#0d9488' }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Shopify stack</h2>
          <p className="section-subtitle">Where I spend time on a typical build</p>
        </motion.div>

        <motion.div
          className="skills-categories"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.keys(skillCategories).map((categoryKey) => (
            <motion.button
              key={categoryKey}
              type="button"
              className={`category-btn ${activeCategory === categoryKey ? 'active' : ''}`}
              onClick={() => setActiveCategory(categoryKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {React.createElement(skillCategories[categoryKey].icon)}
              <span>{skillCategories[categoryKey].title}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="skills-grid" variants={itemVariants}>
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="skill-header">
                  <div className="skill-icon" style={{ color: skill.color }}>
                    <skill.icon />
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="skills-highlights"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="highlight-card">
            <FaShopify className="highlight-icon" />
            <h3>Theme work</h3>
            <p>Layouts that survive real catalogs, promos, and mobile traffic—not just the mockups.</p>
          </div>
          <div className="highlight-card">
            <FaPlug className="highlight-icon" />
            <h3>Integrations</h3>
            <p>ERP, 3PL, subscriptions, and email: fewer moving parts, clearer ownership when something breaks.</p>
          </div>
          <div className="highlight-card">
            <FaTachometerAlt className="highlight-icon" />
            <h3>Speed &amp; stability</h3>
            <p>Lighthouse and field data matter; I trim scripts, fix render-blocking paths, and retest after every app install.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
