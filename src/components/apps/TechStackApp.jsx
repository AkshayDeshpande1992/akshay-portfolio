import React from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../../mock';

const TechStackApp = () => {
  const categories = {
    Cloud: techStack.filter(t => t.category === 'Cloud'),
    AI: techStack.filter(t => t.category === 'AI'),
    Frontend: techStack.filter(t => t.category === 'Frontend'),
    Backend: techStack.filter(t => t.category === 'Backend'),
    Database: techStack.filter(t => t.category === 'Database'),
    DevOps: techStack.filter(t => t.category === 'DevOps')
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 neon-cyan">Tech Stack</h2>
        <p className="text-gray-400">Technologies I work with</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4 neon-purple">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 + i * 0.05 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:border-cyan-400/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStackApp;
