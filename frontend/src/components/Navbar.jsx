import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Waitlist', href: '#waitlist' }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-sm border-b border-white/5' : ''
        }`}
        data-testid="navbar"
      >
        <div className="aether-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-syne text-2xl font-bold tracking-tighter"
              data-testid="navbar-logo"
            >
              <span className="text-cyan-400">AE</span>
              <span className="text-white">X</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#waitlist')}
                className="btn-primary text-xs py-3 px-6"
                data-testid="nav-cta"
              >
                Get Access
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/95 md:hidden pt-20"
          data-testid="mobile-menu"
        >
          <div className="aether-container py-8">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-syne font-bold text-left text-gray-300 hover:text-cyan-400 transition-colors"
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#waitlist')}
                className="btn-primary text-sm py-4 mt-4 w-full"
                data-testid="mobile-nav-cta"
              >
                Get Access
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
