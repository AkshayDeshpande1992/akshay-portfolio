import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AppWindow = ({ title, children, onClose, show }) => {
  const windowRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (show) {
      setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, [show]);

  // Drag handlers
  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;
    const width = windowRef.current?.offsetWidth || 600;
    const height = windowRef.current?.offsetHeight || 400;
    // Allow header to reach top, and window to reach all edges
    newX = Math.max(0, Math.min(window.innerWidth, newX));
    newY = Math.max(0, Math.min(window.innerHeight - height, newY));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

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
            ref={windowRef}
            className="fixed z-[100] w-[90vw] max-w-[900px] max-h-[80vh]"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
              cursor: dragging ? 'grabbing' : 'default',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl h-full flex flex-col"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)'
              }}
            >
              <div className="window-header flex items-center justify-between cursor-grab select-none px-4 py-2 bg-gray-800/80 border-b border-cyan-400/10"
                onMouseDown={handleMouseDown}
              >
                <div className="window-title font-semibold text-white">{title}</div>
                <div className="window-controls flex gap-2">
                  <motion.div
                    className="window-control close"
                    whileHover={{ scale: 1.2 }}
                    onClick={onClose}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={18} className="text-white" />
                  </motion.div>
                  <div className="window-control minimize"></div>
                  <div className="window-control maximize"></div>
                </div>
              </div>
              <div className="window-content p-4 overflow-auto flex-1">
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
