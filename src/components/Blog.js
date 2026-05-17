import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'When a metafield should be a metaobject',
      excerpt:
        'A quick rule of thumb for merchandising data that needs to be reused across PDP, PLP, and cart—and how to keep the editor experience sane.',
      category: 'Platform',
      author: 'Suhail Majeed',
      date: 'Jan 8, 2026',
      readTime: '6 min read',
      coverTopic: 'Metafields',
      accent: '#5c8f3e',
      tags: ['Metafields', 'Metaobjects', 'Editor UX'],
      featured: true
    },
    {
      id: 2,
      title: 'Cart.js is not a trash can',
      excerpt:
        'Why stacking third-party cart drawers breaks discounts, and how I sequence subscription apps, free gifts, and Shopify Functions without fighting the core cart.',
      category: 'Themes',
      author: 'Suhail Majeed',
      date: 'Dec 18, 2025',
      readTime: '7 min read',
      coverTopic: 'Cart',
      accent: '#6366f1',
      tags: ['Cart', 'Subscriptions', 'Apps'],
      featured: false
    },
    {
      id: 3,
      title: '301 maps that survive migrations',
      excerpt:
        'What I export before DNS flips, how I test redirects with real query strings, and the Search Console checks I run the week after go-live.',
      category: 'Ops',
      author: 'Suhail Majeed',
      date: 'Dec 2, 2025',
      readTime: '8 min read',
      coverTopic: 'Redirects',
      accent: '#d97706',
      tags: ['Migration', 'SEO', 'Redirects'],
      featured: true
    },
    {
      id: 4,
      title: 'Webhook retries that do not double-charge',
      excerpt:
        'Idempotency keys, HMAC verification, and the boring logging that keeps Ops calm when Shopify replays `orders/updated` at 2 a.m.',
      category: 'Apps',
      author: 'Suhail Majeed',
      date: 'Nov 20, 2025',
      readTime: '9 min read',
      coverTopic: 'Webhooks',
      accent: '#0d9488',
      tags: ['Webhooks', 'Node', 'Reliability'],
      featured: false
    },
    {
      id: 5,
      title: 'Removing scripts without breaking pixels',
      excerpt:
        'A practical pass for legacy checkout scripts, consent banners, and tag managers—measured on hardware your customers actually use.',
      category: 'Themes',
      author: 'Suhail Majeed',
      date: 'Nov 6, 2025',
      readTime: '6 min read',
      coverTopic: 'Performance',
      accent: '#7c3aed',
      tags: ['Performance', 'Pixels', 'Privacy'],
      featured: false
    },
    {
      id: 6,
      title: 'B2B catalogs: what to lock first',
      excerpt:
        'Company locations vs. tags, how price lists interact with retail promos, and the small Liquid guards that stop wholesale buyers seeing consumer-only merch.',
      category: 'Platform',
      author: 'Suhail Majeed',
      date: 'Oct 22, 2025',
      readTime: '10 min read',
      coverTopic: 'B2B',
      accent: '#2563eb',
      tags: ['B2B', 'Plus', 'Liquid'],
      featured: true
    }
  ];

  const categories = ['All', 'Themes', 'Platform', 'Apps', 'Ops'];

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
    <section id="blog" className="blog section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Shopify notes</h2>
          <p className="section-subtitle">Short writeups I send to clients—published here when they age out of the inbox</p>
        </motion.div>

        <motion.div
          className="blog-categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              type="button"
              className="category-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTag />
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className={`blog-card ${post.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="blog-image" style={{ '--note-accent': post.accent }}>
                <div className="blog-cover" aria-hidden>
                  <span className="blog-cover-num">{String(post.id).padStart(2, '0')}</span>
                  <span className="blog-cover-topic">{post.coverTopic}</span>
                </div>
                <div className="blog-category-badge">{post.category}</div>
                {post.featured && <div className="featured-badge">Featured</div>}
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <div className="meta-item">
                    <FaCalendarAlt />
                    <span>{post.date}</span>
                  </div>
                  <div className="meta-item">
                    <FaUser />
                    <span>{post.author}</span>
                  </div>
                  <div className="meta-item">
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-tags">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button type="button" className="blog-read-more" whileTap={{ scale: 0.98 }}>
                  Read draft
                  <FaArrowRight />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="blog-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cta-content">
            <h3>Want these as a newsletter?</h3>
            <p>Not running one yet—if enough people ask, I will ship a monthly Shopify-only digest.</p>
            <motion.button
              type="button"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ping me about it
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
