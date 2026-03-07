import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import DesktopIcons from './DesktopIcons';
import AppWindow from './AppWindow';
import LoadingScreen from './LoadingScreen';
import ScrollIndicator from './ScrollIndicator';
import ChatBot from './ChatBot';
import TechStackApp from './apps/TechStackApp';
import ExperienceApp from './apps/ExperienceApp';
import ProjectsApp from './apps/ProjectsApp';
import ContactApp from './apps/ContactApp';
import { personalInfo } from '../mock';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIcons, setShowIcons] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  // Simulate loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll for zoom effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 800;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);

      if (progress > 0.5 && !zoomed) {
        setZoomed(true);
        setTimeout(() => setShowIcons(true), 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [zoomed]);

  const handleIconClick = (appId) => {
    setActiveApp(appId);
  };

  const handleCloseApp = () => {
    setActiveApp(null);
  };

  const renderApp = () => {
    switch (activeApp) {
      case 'tech':
        return <TechStackApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'contact':
        return <ContactApp />;
      default:
        return null;
    }
  };

  const getAppTitle = () => {
    switch (activeApp) {
      case 'tech':
        return '~/tech-stack';
      case 'experience':
        return '~/experience';
      case 'projects':
        return '~/projects';
      case 'contact':
        return '~/contact';
      default:
        return '';
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <AnimatePresence>
          {!isLoading && !zoomed && (
            <motion.div
              className="fixed inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.h1
                  className="text-7xl font-bold mb-6 neon-cyan"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(0, 245, 255, 0.8)',
                      '0 0 40px rgba(0, 245, 255, 1)',
                      '0 0 20px rgba(0, 245, 255, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {personalInfo.name}
                </motion.h1>
                <motion.p
                  className="text-2xl text-gray-200 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {personalInfo.title}
                </motion.p>
                <motion.p
                  className="text-sm code-text text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {personalInfo.tagline}
                </motion.p>

                {/* Animated laptop mockup */}
                <motion.div
                  className="mt-16 relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="w-96 h-56 mx-auto glass rounded-lg p-4 relative overflow-hidden">
                    {/* Screen glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg" />
                    
                    {/* Code lines animation */}
                    <div className="relative z-10 space-y-2 code-text text-xs">
                      {['const developer = {', '  name: "Akshay",', '  role: "Senior Engineer",', '  passion: "Building amazing things"', '};'].map((line, i) => (
                        <motion.div
                          key={i}
                          className="text-cyan-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <ScrollIndicator show={!isLoading && !zoomed} />

        {/* Desktop Icons */}
        <DesktopIcons show={showIcons && !activeApp} onIconClick={handleIconClick} />

        {/* App Window */}
        <AppWindow
          title={getAppTitle()}
          show={activeApp !== null}
          onClose={handleCloseApp}
        >
          {renderApp()}
        </AppWindow>
      </div>

      {/* Spacer for scroll */}
      <div style={{ height: '200vh' }} />

      {/* AI ChatBot */}
      <ChatBot />
    </>
  );
};

export default Portfolio;
