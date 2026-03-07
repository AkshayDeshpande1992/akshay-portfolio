import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../mock';
import { Calendar, Building2 } from 'lucide-react';

const ExperienceApp = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 neon-cyan">Experience</h2>
        <p className="text-gray-400">My professional journey</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400"></div>

        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative pl-20"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-6 top-6 w-5 h-5 rounded-full border-2 border-cyan-400 bg-cyan-400/20"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 245, 255, 0.5)',
                    '0 0 30px rgba(0, 245, 255, 0.8)',
                    '0 0 20px rgba(0, 245, 255, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>

              <div className="glass p-6 rounded-xl hover:border-cyan-400/30 transition-all">
                <div className="flex items-center gap-2 text-sm text-cyan-400 mb-2">
                  <Calendar size={16} />
                  <span className="code-text">{exp.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                <div className="flex items-center gap-2 text-purple-400 mb-3">
                  <Building2 size={16} />
                  <span className="text-sm">{exp.company}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceApp;
