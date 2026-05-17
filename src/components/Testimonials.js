import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Nina Okafor',
    position: 'Founder',
    company: 'Northline Supply Co.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&fit=crop&crop=faces&auto=format&q=80',
    rating: 5,
    text: 'We were drowning in metafields after a migration. Suhail untangled the models, fixed the theme so editors stopped breaking the PLP, and wrote a one-page guide our VA actually uses.',
    project: 'Migration + OS 2.0 cleanup'
  },
  {
    id: 2,
    name: 'Leo Park',
    position: 'Head of eCommerce',
    company: 'Fieldkind Outdoors',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces&auto=format&q=80',
    rating: 5,
    text: 'He did the unglamorous stuff: cart edge cases with bundles, script cleanup, and a 3PL sync that stopped overselling on launch weekend. Shopify finally feels boring—in a good way.',
    project: 'Launch hardening'
  },
  {
    id: 3,
    name: 'Amelia Rhodes',
    position: 'Ops lead',
    company: 'Studio Lumen',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces&auto=format&q=80',
    rating: 5,
    text: 'We needed Plus B2B without confusing retail customers. Catalog rules, draft orders, and a theme pass for logged-in buyers—all documented for our finance team.',
    project: 'Shopify Plus B2B'
  },
  {
    id: 4,
    name: 'Marcus Iyer',
    position: 'CTO (contract)',
    company: 'Brightline Retail Group',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&auto=format&q=80',
    rating: 5,
    text: 'Shipped a private app for nightly inventory pulls with proper webhook retries. When the warehouse API hiccuped, we had logs and backoff—not silent drift.',
    project: 'Private inventory app'
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`star ${index < rating ? 'filled' : ''}`} />
    ));
  };

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Merchants & partners</h2>
          <p className="section-subtitle">Notes from people who live in the admin, not slide decks</p>
        </motion.div>

        <div className="testimonials-container">
          <motion.button
            type="button"
            className="testimonial-nav prev"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </motion.button>

          <div className="testimonial-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="testimonial-item"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>

                  <div className="testimonial-text">
                    <p>&ldquo;{TESTIMONIALS[currentTestimonial].text}&rdquo;</p>
                  </div>

                  <div className="testimonial-rating">{renderStars(TESTIMONIALS[currentTestimonial].rating)}</div>

                  <div className="testimonial-author">
                    <div className="author-image">
                      <img
                        src={TESTIMONIALS[currentTestimonial].image}
                        alt={TESTIMONIALS[currentTestimonial].name}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="author-info">
                      <h4>{TESTIMONIALS[currentTestimonial].name}</h4>
                      <p>{TESTIMONIALS[currentTestimonial].position}</p>
                      <span className="company">{TESTIMONIALS[currentTestimonial].company}</span>
                    </div>
                  </div>

                  <div className="testimonial-project">
                    <span className="project-label">Engagement:</span>
                    <span className="project-name">{TESTIMONIALS[currentTestimonial].project}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            className="testimonial-nav next"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </motion.button>
        </div>

        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, index) => (
            <motion.button
              key={index}
              type="button"
              className={`dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cta-content">
            <h3>References on request</h3>
            <p>Happy to connect you with teams I have shipped for—especially if your project touches Plus, B2B, or custom apps.</p>
            <motion.button
              type="button"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ask for a reference
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
