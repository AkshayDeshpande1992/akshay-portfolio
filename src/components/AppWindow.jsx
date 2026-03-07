import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AppWindow = ({ title, children, onClose, show }) => {
  // Handle ESC key to close window
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when window is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Window */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-[100] w-[90vw] max-w-[900px] max-h-[80vh]"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)'
              }}
            >
              <div className="window-header">
                <div className="window-title">{title}</div>
                <div className="window-controls">
                  <motion.div
                    className="window-control close"
                    whileHover={{ scale: 1.2 }}
                    onClick={onClose}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={8} className="text-white" />
                  </motion.div>
                  <div className="window-control minimize"></div>
                  <div className="window-control maximize"></div>
                </div>
              </div>
              <div className="window-content">
                {children}
              </div>
              
              {/* ESC hint */}
              <div className="px-4 py-2 bg-black/30 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center code-text">
                  Press <kbd className="px-2 py-1 bg-white/10 rounded text-cyan-400">ESC</kbd> or click outside to close
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppWindow;
