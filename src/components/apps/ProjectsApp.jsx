import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../mock';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsApp = () => {
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
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg text-sm text-cyan-400 hover:bg-cyan-400/20 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <ExternalLink size={16} />
                <span>Demo</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
