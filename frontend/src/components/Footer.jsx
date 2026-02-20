import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' }
];

const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press Kit', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' }
];

export const Footer = () => {
  return (
    <footer 
      className="relative py-16 border-t border-white/5"
      data-testid="footer-section"
    >
      <div className="aether-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-syne text-3xl font-bold tracking-tighter"
            >
              <span className="text-cyan-400">AETHER</span>
              <span className="text-violet-400">X</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 max-w-xs"
            >
              Where Intelligence Meets Imagination. 
              The future of AI-powered creativity.
            </motion.p>
          </div>

          {/* Links */}
          <div className="lg:justify-self-center">
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-6"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider"
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </div>

          {/* Social */}
          <div className="lg:justify-self-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
              data-testid="social-links"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AetherX. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs font-mono">
            v0.1.0-alpha
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
