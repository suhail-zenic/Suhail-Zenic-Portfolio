import React from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="toggle-icon"
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
