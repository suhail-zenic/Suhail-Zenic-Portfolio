import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShopify } from 'react-icons/fa';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div 
          className="hero-particles"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div className="hero-gradient" />
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Suhail Zenic
            </motion.h1>

            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="hero-role">
                Full-Stack Developer & Shopify Expert
              </span>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting exceptional digital experiences with modern technologies. 
              Specializing in web development, Shopify stores, and intelligent automation solutions.
            </motion.p>


          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="hero-avatar">
            <div className="avatar-container">
              <div className="avatar-image">
                <FaShopify className="avatar-icon" />
              </div>
              <div className="avatar-ring" />
              <div className="floating-elements">
                <div className="floating-element element-1">
                  <span>Python</span>
                </div>
                <div className="floating-element element-2">
                  <span>Java</span>
                </div>
                <div className="floating-element element-3">
                  <span>Shopify</span>
                </div>
                <div className="floating-element element-4">
                  <span>AI</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <div className="scroll-line" />
          <div className="scroll-text">Scroll Down</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
