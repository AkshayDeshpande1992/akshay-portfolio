import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AppWindow = ({ title, children, onClose, show, isMobile = false }) => {
  const windowRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Center popup whenever it opens
  useEffect(() => {
    if (!show || isMobile) return;

    requestAnimationFrame(() => {
      const width = windowRef.current?.offsetWidth || 900;
      const height = windowRef.current?.offsetHeight || 700;

      setPosition({
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2,
      });
    });
  }, [show, isMobile]);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleMouseDown = (e) => {
    if (isMobile) return;

    setDragging(true);

    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!dragging) return;

    const move = (e) => {
      const width = windowRef.current?.offsetWidth || 900;
      const height = windowRef.current?.offsetHeight || 700;

      let x = e.clientX - dragOffset.x;
      let y = e.clientY - dragOffset.y;

      x = Math.max(0, Math.min(window.innerWidth - width, x));
      y = Math.max(0, Math.min(window.innerHeight - height, y));

      setPosition({ x, y });
    };

    const up = () => {
      setDragging(false);
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [dragging, dragOffset]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          ref={windowRef}
          className={`fixed z-[100] ${
            isMobile
              ? 'w-[95vw] h-[90vh] inset-0 m-auto'
              : 'w-[90vw] max-w-[900px] max-h-[80vh]'
          }`}
          style={
            isMobile
              ? {}
              : {
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  cursor: dragging ? 'grabbing' : 'default',
                }
          }
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl h-full flex flex-col"
            style={{
              boxShadow:
                '0 20px 60px rgba(0,0,0,.5),0 0 40px rgba(0,245,255,.2)',
            }}
          >
            <div
              className={`window-header flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-cyan-400/10 ${
                isMobile ? 'cursor-default' : 'cursor-grab'
              }`}
              onMouseDown={!isMobile ? handleMouseDown : undefined}
            >
              <div className="window-title font-semibold text-white">
                {title}
              </div>

              <div className="window-controls flex gap-2">
                <motion.div
                  className="window-control close"
                  whileHover={{ scale: 1.2 }}
                  onClick={onClose}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={18} className="text-white" />
                </motion.div>

                {!isMobile && (
                  <>
                    <div className="window-control minimize" />
                    <div className="window-control maximize" />
                  </>
                )}
              </div>
            </div>

            <div className="window-content p-4 overflow-auto flex-1">
              {children}
            </div>

            <div className="px-4 py-2 bg-black/30 border-t border-white/10">
              <p className="text-gray-500 text-center code-text text-xs">
                {isMobile ? (
                  <>
                    Tap outside or the{' '}
                    <span className="text-cyan-400">✕</span> to close
                  </>
                ) : (
                  <>
                    Press{' '}
                    <kbd className="px-2 py-1 bg-white/10 rounded text-cyan-400">
                      ESC
                    </kbd>{' '}
                    or click outside to close
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default AppWindow;
