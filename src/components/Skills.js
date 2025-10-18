import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPython, 
  FaJava, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaShopify, 
  FaRobot, 
  FaDatabase,
  FaCloud,
  FaMobile,
  FaCode,
  FaServer
} from 'react-icons/fa';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('languages');

  const skillCategories = {
    languages: {
      title: 'Programming Languages',
      icon: FaCode,
      skills: [
        { name: 'Python', level: 95, icon: FaPython, color: '#3776ab' },
        { name: 'Java', level: 90, icon: FaJava, color: '#f89820' },
        { name: 'JavaScript', level: 85, icon: FaJs, color: '#f7df1e' },
        { name: 'TypeScript', level: 80, icon: FaJs, color: '#3178c6' }
      ]
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      icon: FaReact,
      skills: [
        { name: 'React', level: 90, icon: FaReact, color: '#61dafb' },
        { name: 'Node.js', level: 85, icon: FaNodeJs, color: '#339933' },
        { name: 'Django/Flask', level: 90, icon: FaPython, color: '#092e20' },
        { name: 'Express.js', level: 85, icon: FaServer, color: '#000000' }
      ]
    },
    ecommerce: {
      title: 'E-commerce & Shopify',
      icon: FaShopify,
      skills: [
        { name: 'Shopify Development', level: 95, icon: FaShopify, color: '#96bf48' },
        { name: 'Shopify Apps', level: 90, icon: FaShopify, color: '#96bf48' },
        { name: 'Liquid Templating', level: 95, icon: FaCode, color: '#96bf48' },
        { name: 'Shopify Plus', level: 85, icon: FaShopify, color: '#96bf48' }
      ]
    },
    ai: {
      title: 'AI & Automation',
      icon: FaRobot,
      skills: [
        { name: 'Machine Learning', level: 85, icon: FaRobot, color: '#ff6b6b' },
        { name: 'Chatbots', level: 90, icon: FaRobot, color: '#4ecdc4' },
        { name: 'Process Automation', level: 88, icon: FaRobot, color: '#45b7d1' },
        { name: 'Data Analysis', level: 80, icon: FaDatabase, color: '#96ceb4' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: FaCloud,
      skills: [
        { name: 'Git & GitHub', level: 90, icon: FaCode, color: '#f05032' },
        { name: 'AWS/Cloud', level: 80, icon: FaCloud, color: '#ff9900' },
        { name: 'Docker', level: 75, icon: FaServer, color: '#2496ed' },
        { name: 'Mobile Development', level: 70, icon: FaMobile, color: '#007aff' }
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
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
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
          <motion.div
            className="skills-grid"
            variants={itemVariants}
          >
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
            <h3>Shopify Expert</h3>
            <p>Specialized in building custom Shopify stores, apps, and integrations</p>
          </div>
          <div className="highlight-card">
            <FaRobot className="highlight-icon" />
            <h3>AI & Automation</h3>
            <p>Creating intelligent solutions that streamline business processes</p>
          </div>
          <div className="highlight-card">
            <FaCode className="highlight-icon" />
            <h3>Full-Stack Development</h3>
            <p>End-to-end development from frontend to backend systems</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
