import { Twitter, Instagram, Youtube, Linkedin, Github, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/intent/tweet?text=Check%20out%20AetherX%20-%20Where%20Intelligence%20Meets%20Imagination!%20🚀&url=', label: 'Twitter', shareUrl: true },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/shareArticle?mini=true&title=AetherX%20-%20The%20Future%20of%20AI&url=', label: 'LinkedIn', shareUrl: true },
  { icon: Github, href: 'https://github.com', label: 'GitHub' }
];

const footerLinks = [
  { label: 'About', href: '#story' },
  { label: 'Features', href: '#features' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' }
];

export const Footer = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = async () => {
    const shareData = {
      title: 'AetherX - Where Intelligence Meets Imagination',
      text: 'Check out AetherX - the future of AI-powered creativity!',
      url: currentUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Thanks for sharing!');
      } else {
        await navigator.clipboard.writeText(currentUrl);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        await navigator.clipboard.writeText(currentUrl);
        toast.success('Link copied to clipboard!');
      }
    }
  };

  const handleSocialClick = (social, e) => {
    if (social.shareUrl) {
      e.preventDefault();
      const url = social.href + encodeURIComponent(currentUrl);
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleFooterLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer 
      className="relative py-16 border-t border-white/5"
      data-testid="footer-section"
    >
      <div className="aether-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-syne text-3xl font-bold tracking-tighter">
              <span className="text-cyan-400">AETHER</span>
              <span className="text-violet-400">X</span>
            </h3>
            <p className="text-gray-500 max-w-xs">
              Where Intelligence Meets Imagination. 
              The future of AI-powered creativity.
            </p>
            
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              data-testid="share-button"
            >
              <Share2 className="w-4 h-4" />
              <span>Share AetherX</span>
            </button>
          </div>

          {/* Links */}
          <div className="lg:justify-self-center">
            <nav className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleFooterLinkClick(e, link.href)}
                  className="text-gray-500 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider"
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="lg:justify-self-end">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-4">Follow & Share</p>
            <div className="flex gap-4" data-testid="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={(e) => handleSocialClick(social, e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AetherX. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs font-mono">
            v0.1.0-alpha
          </p>
        </div>
      </div>
    </footer>
  );
};
