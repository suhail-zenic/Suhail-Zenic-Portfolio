import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Suhail delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and professional. The Shopify integration was flawless!",
      project: 'E-commerce Platform'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Operations Director',
      company: 'InnovateCorp',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "The AI automation solution Suhail created has revolutionized our workflow. We've seen a 40% increase in efficiency since implementation. His Python expertise is outstanding.",
      project: 'AI Automation System'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Marketing Manager',
      company: 'RetailMax',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Working with Suhail on our Shopify store was a game-changer. The custom theme and automation features have significantly improved our conversion rates. Highly recommended!",
      project: 'Shopify Store Development'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'CTO',
      company: 'DataFlow Solutions',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "Suhail's full-stack development skills are impressive. He built a complex application with both frontend and backend components, delivering on time and within budget.",
      project: 'Full-Stack Application'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      position: 'Founder',
      company: 'StartupXYZ',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: "The chatbot Suhail developed for our customer support has reduced response time by 60%. His AI and automation expertise is truly remarkable.",
      project: 'AI Chatbot Development'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      />
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
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">What clients say about my work</p>
        </motion.div>

        <div className="testimonials-container">
          <motion.button
            className="testimonial-nav prev"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
                    <p>"{testimonials[currentTestimonial].text}"</p>
                  </div>

                  <div className="testimonial-rating">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>

                  <div className="testimonial-author">
                    <div className="author-image">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                      />
                    </div>
                    <div className="author-info">
                      <h4>{testimonials[currentTestimonial].name}</h4>
                      <p>{testimonials[currentTestimonial].position}</p>
                      <span className="company">{testimonials[currentTestimonial].company}</span>
                    </div>
                  </div>

                  <div className="testimonial-project">
                    <span className="project-label">Project:</span>
                    <span className="project-name">{testimonials[currentTestimonial].project}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            className="testimonial-nav next"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
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
            <h3>Ready to Join These Happy Clients?</h3>
            <p>Let's work together to create something amazing for your business.</p>
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
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
