import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../mock';
import { ExternalLink, Github, X } from 'lucide-react';
import ApiUsageCanvas from '../ApiUsageCanvas';

const ProjectsApp = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 neon-cyan">Projects</h2>
        <p className="text-gray-400">Featured work and applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-xl hover:border-cyan-400/30 transition-all group"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-md text-xs font-medium text-cyan-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-cyan-400/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Github size={16} />
                  <span>Code</span>
                </motion.a>
              )}
              {project.showApiCanvas && (
                <motion.button
                  onClick={() => setExpandedProject(project.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg text-sm text-cyan-400 hover:bg-cyan-400/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <ExternalLink size={16} />
                  <span>API</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* API Canvas Modal */}
      {expandedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedProject(null)}
        >
          <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  className="glass rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-cyan-400/20 bg-gray-900/95 backdrop-blur-xl">
    <h2 className="text-2xl font-bold neon-cyan">
      API Usage Guide
    </h2>
               <motion.button
      onClick={() => setExpandedProject(null)}
      className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <X size={24} className="text-cyan-400" />
    </motion.button>
  </div>
           
             <div className="flex-1 overflow-y-auto p-6">
    <ApiUsageCanvas />
  </div>
</motion.div>
      )}
    </div>
  );
};

export default ProjectsApp;
