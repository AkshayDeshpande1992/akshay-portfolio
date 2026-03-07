import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AppWindow = ({ title, children, onClose, show }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="app-window"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="window-header">
          <div className="window-title">{title}</div>
          <div className="window-controls">
            <motion.div
              className="window-control close"
              whileHover={{ scale: 1.2 }}
              onClick={onClose}
            >
              <X size={8} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" style={{ fontSize: 8 }} />
            </motion.div>
            <div className="window-control minimize"></div>
            <div className="window-control maximize"></div>
          </div>
        </div>
        <div className="window-content">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppWindow;
