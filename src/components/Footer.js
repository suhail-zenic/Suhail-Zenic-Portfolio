import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quick: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Portfolio', href: '#portfolio' }
    ],
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'Shopify Development', href: '#services' },
      { name: 'AI & Automation', href: '#services' },
      { name: 'Mobile Development', href: '#services' }
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-main"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-brand">
              <h3>Suhail Zenic</h3>
              <p>
                Full-Stack Developer & Shopify Specialist crafting exceptional 
                digital experiences with modern technologies and innovative solutions.
              </p>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4>Quick Links</h4>
                <ul>
                  {footerLinks.quick.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4>Services</h4>
                <ul>
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4>Resources</h4>
                <ul>
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.href.startsWith('#')) {
                            scrollToSection(link.href);
                          }
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="footer-copyright">
              <p>
                &copy; {currentYear} Suhail Zenic. All rights reserved. 
                Made with <FaHeart className="heart-icon" /> and modern technologies.
              </p>
            </div>

            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <FaArrowUp />
              <span>Back to Top</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
