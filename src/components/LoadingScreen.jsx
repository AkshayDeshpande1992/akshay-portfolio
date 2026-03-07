import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ progress }) => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-spinner"></div>
      <motion.p
        className="mt-6 text-lg code-text neon-cyan"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Experience... {Math.round(progress)}%
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
