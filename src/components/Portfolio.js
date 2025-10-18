import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaShopify, FaRobot, FaCode, FaMobile } from 'react-icons/fa';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Real-Time Chat App',
      description: 'A modern real-time messaging application built with Node.js and Socket.io, featuring instant messaging, user authentication, and responsive design.',
      image: '/api/placeholder/400/300',
      category: 'web',
      technologies: ['Node.js', 'Socket.io', 'Express', 'MongoDB'],
      github: 'https://github.com/suhail-zenic/Real-Time-Chat-App.git',
      live: '#',
      icon: FaCode,
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Einstein AI Bot',
      description: 'An intelligent chatbot powered by machine learning, capable of natural language processing and automated responses for customer support.',
      image: '/api/placeholder/400/300',
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'NLP', 'Flask'],
      github: 'https://github.com/suhail-zenic/Einstein-chat.git',
      live: '#',
      icon: FaRobot,
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'E-commerce Shopify Store',
      description: 'A fully customized Shopify store with advanced features, custom theme development, and integrated payment solutions.',
      image: '/api/placeholder/400/300',
      category: 'shopify',
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
      github: '#',
      live: '#',
      icon: FaShopify,
      color: '#96bf48'
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'A comprehensive task management application with real-time updates, team collaboration features, and progress tracking.',
      image: '/api/placeholder/400/300',
      category: 'web',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      github: 'https://github.com/suhail-zenic/My-To-Do-app.git',
      live: '#',
      icon: FaCode,
      color: '#10b981'
    },
    {
      id: 5,
      title: 'Mobile Fitness Tracker',
      description: 'A cross-platform mobile application for fitness tracking with workout plans, progress analytics, and social features.',
      image: '/api/placeholder/400/300',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
      github: '#',
      live: '#',
      icon: FaMobile,
      color: '#8b5cf6'
    },
    {
      id: 6,
      title: 'Shopify Automation App',
      description: 'A custom Shopify app that automates inventory management, order processing, and customer communication workflows.',
      image: '/api/placeholder/400/300',
      category: 'shopify',
      technologies: ['Shopify API', 'Python', 'Webhooks', 'Database'],
      github: '#',
      live: '#',
      icon: FaShopify,
      color: '#96bf48'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'shopify', label: 'Shopify' },
    { key: 'ai', label: 'AI & Automation' },
    { key: 'mobile', label: 'Mobile Apps' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Some of my recent work and achievements</p>
        </motion.div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="portfolio-item"
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="portfolio-image">
                  <div className="project-overlay">
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-technologies">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="project-links">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    </div>
                  </div>
                  <div className="project-category">
                    <project.icon style={{ color: project.color }} />
                    <span>{project.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="portfolio-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cta-content">
            <h3>Interested in Working Together?</h3>
            <p>I'm always excited to take on new challenges and create amazing digital experiences.</p>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start a Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
