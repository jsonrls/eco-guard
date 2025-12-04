import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import Button from './ui/Button';

interface NavbarProps {
  onEnterApp?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onEnterApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3 border-b border-slate-100' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Leaf size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              EcoGuard <span className="text-primary">Naga</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-500 hover:text-primary font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-500 hover:text-primary font-medium transition-colors">How it Works</a>
            <a href="#impact" className="text-slate-500 hover:text-primary font-medium transition-colors">Impact</a>
            <Button variant="primary" size="sm" onClick={onEnterApp}>
              Try Prototype
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#features" className="block py-3 px-4 text-slate-600 hover:bg-slate-50 rounded-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block py-3 px-4 text-slate-600 hover:bg-slate-50 rounded-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
            <a href="#impact" className="block py-3 px-4 text-slate-600 hover:bg-slate-50 rounded-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Impact</a>
            <div className="pt-4 px-4">
              <Button variant="primary" className="w-full" onClick={() => { setIsMobileMenuOpen(false); onEnterApp?.(); }}>
                Try Prototype
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;