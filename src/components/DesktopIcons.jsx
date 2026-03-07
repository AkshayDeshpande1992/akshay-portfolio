import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase, FolderKanban, Mail } from 'lucide-react';

const icons = [
  { id: 'tech', icon: Code2, label: 'Tech Stack', color: '#00F5FF' },
  { id: 'experience', icon: Briefcase, label: 'Experience', color: '#9D4EDD' },
  { id: 'projects', icon: FolderKanban, label: 'Projects', color: '#00F5FF' },
  { id: 'contact', icon: Mail, label: 'Contact', color: '#9D4EDD' }
];

const DesktopIcons = ({ onIconClick, show }) => {
  if (!show) return null;

  return (
    <div className="desktop-environment">
      <div className="desktop-icons-container">
        {icons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className="desktop-icon"
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => onIconClick(item.id)}
            >
              <motion.div
                className="icon-wrapper"
                animate={{
                  boxShadow: [
                    `0 0 20px ${item.color}40`,
                    `0 0 30px ${item.color}60`,
                    `0 0 20px ${item.color}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon size={40} style={{ color: item.color }} />
              </motion.div>
              <span className="icon-label">{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopIcons;
