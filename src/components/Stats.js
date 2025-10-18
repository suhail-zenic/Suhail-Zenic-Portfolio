import React, { useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaUsers, FaAward, FaRocket } from 'react-icons/fa';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [counts, setCounts] = useState({
    projectscompleted: 0,
    happyclients: 0,
    yearsexperience: 0,
    technologies: 0
  });

  const stats = useMemo(() => [
    {
      icon: FaCode,
      target: 50,
      label: 'Projects Completed',
      key: 'projectscompleted',
      suffix: '+',
      color: '#6366f1'
    },
    {
      icon: FaUsers,
      target: 25,
      label: 'Happy Clients',
      key: 'happyclients',
      suffix: '+',
      color: '#10b981'
    },
    {
      icon: FaAward,
      target: 3,
      label: 'Years Experience',
      key: 'yearsexperience',
      suffix: '+',
      color: '#f59e0b'
    },
    {
      icon: FaRocket,
      target: 15,
      label: 'Technologies',
      key: 'technologies',
      suffix: '+',
      color: '#8b5cf6'
    }
  ], []);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.target / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            current = stat.target;
            clearInterval(timer);
          }
          
          setCounts(prev => ({
            ...prev,
            [stat.key]: Math.floor(current)
          }));
        }, stepDuration);
      });
    }
  }, [isInView, stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="stats section" ref={ref}>
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                <stat.icon />
              </div>
              <motion.div
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10,
                  delay: index * 0.1
                }}
              >
                {isInView ? (
                  counts[stat.key] || 0
                ) : 0}
                {stat.suffix}
              </motion.div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
