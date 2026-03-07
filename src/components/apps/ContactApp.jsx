import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../mock';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully! (Demo)');
    setTimeout(() => setStatus(''), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 neon-cyan">Get In Touch</h2>
        <p className="text-gray-400">Let's collaborate on something amazing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 neon-purple">Connect with me</h3>
          
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-4 glass p-4 rounded-xl hover:border-cyan-400/30 transition-all"
            whileHover={{ x: 5 }}
          >
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center">
              <Mail size={20} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium">{personalInfo.email}</p>
            </div>
          </motion.a>

          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 glass p-4 rounded-xl hover:border-cyan-400/30 transition-all"
            whileHover={{ x: 5 }}
          >
            <div className="w-12 h-12 rounded-full bg-purple-400/10 flex items-center justify-center">
              <Github size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">GitHub</p>
              <p className="font-medium">akshaydeshpande</p>
            </div>
          </motion.a>

          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 glass p-4 rounded-xl hover:border-cyan-400/30 transition-all"
            whileHover={{ x: 5 }}
          >
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center">
              <Linkedin size={20} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">LinkedIn</p>
              <p className="font-medium">akshaydeshpande</p>
            </div>
          </motion.a>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4 neon-purple">Send a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all resize-none"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 rounded-xl font-medium text-cyan-400 hover:from-cyan-400/30 hover:to-purple-400/30 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={18} />
              <span>Send Message</span>
            </motion.button>
            {status && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-400 text-center"
              >
                {status}
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
