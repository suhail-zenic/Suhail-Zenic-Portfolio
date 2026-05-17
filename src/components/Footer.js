import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quick: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Stack', href: '#skills' },
      { name: 'Work', href: '#portfolio' }
    ],
    services: [
      { name: 'Themes & storefront', href: '#services' },
      { name: 'Migrations', href: '#services' },
      { name: 'Custom apps', href: '#services' },
      { name: 'Integrations & ops', href: '#services' }
    ],
    resources: [
      { name: 'Notes', href: '#blog' },
      { name: 'Clients', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/suhail-zenic', label: 'GitHub' },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/suhail-majeed-449478369',
      label: 'LinkedIn'
    },
    { icon: FaTwitter, href: 'https://x.com/suhailzenic', label: 'X' },
    { icon: FaInstagram, href: 'https://www.instagram.com/suhailx777', label: 'Instagram' }
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
              <h3>Suhail Majeed</h3>
              <p>
                Independent Shopify developer: themes, custom apps, migrations, and the integrations around fulfillment
                and finance. Based online—shipping for merchants and agencies.
              </p>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
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
                &copy; {currentYear} Suhail Majeed. All rights reserved. 
                Built with <FaHeart className="heart-icon" /> and a lot of Liquid.
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
