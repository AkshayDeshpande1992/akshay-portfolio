import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AppWindow = ({ title, children, onClose, show, isMobile = false }) => {
  const windowRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (show) {
      // For mobile, center the window; for desktop, position at top-left
      if (isMobile) {
        setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      } else {
        setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isMobile]);

  // Drag handlers
  const handleMouseDown = (e) => {
    // Disable dragging on mobile
    if (isMobile) return;
    
    setDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!dragging || isMobile) return;
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
    if (dragging && !isMobile) {
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
  }, [dragging, isMobile]);

  useEffect(() => {
    if (show) {
      // Prevent body scroll when window is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

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
            className={`fixed z-[100] ${
              isMobile 
                ? 'w-[95vw] h-[90vh] inset-0 m-auto' 
                : 'w-[90vw] max-w-[900px] max-h-[80vh]'
            }`}
            style={
              !isMobile 
                ? {
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                    cursor: dragging ? 'grabbing' : 'default',
                  }
                : {}
            }
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
              <div className={`window-header flex items-center justify-between ${
                isMobile ? 'cursor-default' : 'cursor-grab'
              } select-none px-4 py-2 bg-gray-800/80 border-b border-cyan-400/10`}
                onMouseDown={!isMobile ? handleMouseDown : undefined}
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
                  {!isMobile && (
                    <>
                      <div className="window-control minimize"></div>
                      <div className="window-control maximize"></div>
                    </>
                  )}
                </div>
              </div>
              <div className="window-content p-4 overflow-auto flex-1">
                {children}
              </div>
              
              {/* ESC hint */}
              <div className="px-4 py-2 bg-black/30 border-t border-white/10">
                <p className={`text-gray-500 text-center code-text ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  {isMobile ? (
                    <span>Tap outside or the <span className="text-cyan-400">✕</span> to close</span>
                  ) : (
                    <span>Press <kbd className="px-2 py-1 bg-white/10 rounded text-cyan-400">ESC</kbd> or click outside to close</span>
                  )}
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
