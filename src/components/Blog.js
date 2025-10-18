import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Web Development',
      excerpt: 'Exploring how artificial intelligence is reshaping the way we build and interact with web applications, from automated code generation to intelligent user experiences.',
      content: 'Artificial intelligence is revolutionizing web development in unprecedented ways...',
      category: 'AI & Automation',
      author: 'Suhail Zenic',
      date: 'Dec 15, 2024',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['AI', 'Web Development', 'Automation'],
      featured: true
    },
    {
      id: 2,
      title: 'Building Scalable Python Applications',
      excerpt: 'Best practices and patterns for creating maintainable and scalable Python applications that can handle growth and complexity.',
      content: 'Python has become one of the most popular programming languages...',
      category: 'Development',
      author: 'Suhail Zenic',
      date: 'Dec 10, 2024',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      tags: ['Python', 'Backend', 'Scalability'],
      featured: false
    },
    {
      id: 3,
      title: 'Shopify Development Best Practices',
      excerpt: 'Essential tips and techniques for building high-converting Shopify stores with custom themes, apps, and integrations.',
      content: 'Shopify has become the go-to platform for e-commerce businesses...',
      category: 'E-commerce',
      author: 'Suhail Zenic',
      date: 'Dec 5, 2024',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['Shopify', 'E-commerce', 'Liquid'],
      featured: true
    },
    {
      id: 4,
      title: 'Modern Web Development Trends 2024',
      excerpt: 'A comprehensive look at the latest trends shaping the future of web development, from new frameworks to emerging technologies.',
      content: 'The web development landscape is constantly evolving...',
      category: 'Technology',
      author: 'Suhail Zenic',
      date: 'Nov 28, 2024',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      tags: ['Web Development', 'Trends', 'Technology'],
      featured: false
    },
    {
      id: 5,
      title: 'Automation in E-commerce: A Complete Guide',
      excerpt: 'How to leverage automation to streamline your e-commerce operations, from inventory management to customer service.',
      content: 'E-commerce automation is no longer a luxury but a necessity...',
      category: 'Automation',
      author: 'Suhail Zenic',
      date: 'Nov 20, 2024',
      readTime: '9 min read',
      image: '/api/placeholder/400/250',
      tags: ['Automation', 'E-commerce', 'Efficiency'],
      featured: false
    },
    {
      id: 6,
      title: 'Building Custom Shopify Apps',
      excerpt: 'A step-by-step guide to creating custom Shopify apps that extend platform functionality and provide unique value to merchants.',
      content: 'Shopify apps are powerful tools that can significantly enhance...',
      category: 'Shopify',
      author: 'Suhail Zenic',
      date: 'Nov 15, 2024',
      readTime: '10 min read',
      image: '/api/placeholder/400/250',
      tags: ['Shopify', 'Apps', 'Development'],
      featured: true
    }
  ];

  const categories = ['All', 'AI & Automation', 'Development', 'E-commerce', 'Technology', 'Automation', 'Shopify'];

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
          <h2 className="section-title">Latest Insights</h2>
          <p className="section-subtitle">Thoughts on technology, development, and industry trends</p>
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
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className={`blog-card ${post.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="blog-image">
                <div className="blog-category-badge">
                  {post.category}
                </div>
                {post.featured && (
                  <div className="featured-badge">
                    Featured
                  </div>
                )}
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

                <motion.button
                  className="blog-read-more"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Read More
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
            <h3>Stay Updated with Latest Insights</h3>
            <p>Follow my blog for the latest trends in web development, AI, and e-commerce.</p>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Posts
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
