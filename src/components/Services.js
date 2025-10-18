import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaShopify, 
  FaRobot, 
  FaMobile, 
  FaCloud, 
  FaChartLine,
  FaCog,
  FaRocket
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaShopify,
      title: 'Shopify Development',
      description: 'Complete Shopify store development, customization, and optimization for maximum conversion rates.',
      features: [
        'Custom Theme Development',
        'Shopify App Development',
        'Store Migration & Setup',
        'Performance Optimization',
        'Liquid Template Customization',
        'Shopify Plus Solutions'
      ],
      color: '#96bf48',
      gradient: 'linear-gradient(135deg, #96bf48 0%, #7ba05b 100%)'
    },
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies and best practices.',
      features: [
        'Frontend Development (React, Vue)',
        'Backend APIs (Python, Node.js)',
        'Database Design & Optimization',
        'Responsive Design',
        'Performance Optimization',
        'SEO Implementation'
      ],
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    {
      icon: FaRobot,
      title: 'AI & Automation',
      description: 'Intelligent solutions that automate processes and enhance user experiences through AI technology.',
      features: [
        'Chatbot Development',
        'Process Automation',
        'Machine Learning Models',
        'Data Analysis & Insights',
        'Workflow Automation',
        'AI Integration'
      ],
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
    },
    {
      icon: FaMobile,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications that deliver seamless user experiences across all devices.',
      features: [
        'React Native Development',
        'Progressive Web Apps',
        'Mobile-First Design',
        'App Store Deployment',
        'Performance Optimization',
        'Cross-Platform Solutions'
      ],
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      icon: FaCloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
      features: [
        'AWS/Google Cloud Setup',
        'Docker Containerization',
        'CI/CD Pipeline Setup',
        'Serverless Architecture',
        'Database Management',
        'Security Implementation'
      ],
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    {
      icon: FaChartLine,
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce solutions including store setup, payment integration, and analytics.',
      features: [
        'Multi-Platform Integration',
        'Payment Gateway Setup',
        'Inventory Management',
        'Analytics & Reporting',
        'Marketing Automation',
        'Customer Experience Optimization'
      ],
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
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
          <h2 className="section-title">Services I Offer</h2>
          <p className="section-subtitle">Comprehensive development solutions tailored to your needs</p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
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
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <FaCog className="feature-icon" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="service-btn"
                style={{ 
                  background: service.gradient,
                  color: 'white'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
                <FaRocket className="btn-icon" />
              </motion.button>
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
            <h3>Ready to Start Your Project?</h3>
            <p>Let's discuss how I can help bring your ideas to life with cutting-edge technology and expert development.</p>
            <div className="cta-buttons">
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
                Get Started
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('#portfolio');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
