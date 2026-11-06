import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const getInitialTheme = () => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return JSON.parse(saved);
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((d) => !d)} />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Portfolio />
        <Services />
        <Process />
        <Reviews />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </MotionConfig>
  );
}

export default App;
