import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCode, FaRobot, FaShopify } from 'react-icons/fa';

const About = () => {

  const features = [
    'Full-Stack Development',
    'Shopify Specialist',
    'AI & Automation Expert',
    'Client-Focused Solutions',
    'Modern Technologies'
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
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Passionate developer crafting digital solutions</p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Hello, I'm Suhail Zenic</h3>
            <p>
              I'm a passionate full-stack developer with expertise in Python, Java, and Shopify development, 
              specializing in creating intelligent solutions through AI and automation. With a strong foundation 
              in both frontend and backend technologies, I bring ideas to life through clean, efficient, and scalable code.
            </p>
            <p>
              My journey in technology began with a fascination for problem-solving and has evolved into a career 
              focused on building innovative applications that make a real difference. I believe in continuous learning 
              and staying at the forefront of technological advancements, especially in the rapidly evolving e-commerce 
              and AI spaces.
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
                View My Work
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
                Get In Touch
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
                  <h4>Full-Stack Development</h4>
                </div>
                <div className="card-content">
                  <p>End-to-end development from concept to deployment</p>
                  <div className="card-stats">
                    <span>50+ Projects</span>
                    <span>3+ Years</span>
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
                  <h4>Shopify Specialist</h4>
                </div>
                <div className="card-content">
                  <p>Custom stores, apps, and e-commerce solutions</p>
                  <div className="card-stats">
                    <span>20+ Stores</span>
                    <span>95% Success</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="about-card accent"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header">
                  <FaRobot className="card-icon" />
                  <h4>AI & Automation</h4>
                </div>
                <div className="card-content">
                  <p>Intelligent solutions for business optimization</p>
                  <div className="card-stats">
                    <span>15+ Bots</span>
                    <span>40% Efficiency</span>
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
