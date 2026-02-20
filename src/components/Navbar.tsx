import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Navbar = ({ t, currentLang, onToggleLang }: { t: any, currentLang: string, onToggleLang: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault(); 
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-[1120px] px-4 md:px-6">
        <div className="relative flex items-center justify-between h-[60px] rounded-[40px] glass-panel px-6 md:px-8">

          {/* Logo (Smaller on Mobile) */}
          <a href="#" onClick={scrollToTop} className="h-5 md:h-8 w-auto cursor-pointer">
            <img 
              src="/icons/logo.svg" 
              alt="MDVIA logo" 
              className="w-full h-full object-contain"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-white transition-colors">{t.about}</a>
            <a href="#services" className="hover:text-white transition-colors">{t.services}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.contact}</a>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleLang}
              className="text-sm font-medium text-gray-300 hover:text-white cursor-pointer bg-transparent border-none p-0"
            >
              {currentLang === 'en' ? 'EN' : 'PT'}
            </button>

            {/* Mobile Menu Toggle (Matches mockup: 2 lines) */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6 text-gray-300 hover:text-white"
              aria-label="Open menu"
            >
              <span className="w-5 h-[2px] bg-current rounded-full"></span>
              <span className="w-5 h-[2px] bg-current rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark Shadow Backdrop (Covers the bottom 3/4) */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Solid Black Dropdown Panel (Covers the top 1/4) */}
        <div 
          className={`absolute top-0 left-0 w-full bg-[#0a0a0a] border-b border-white/5 px-8 py-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Close Button matching your mockup */}
          <div className="flex justify-end mb-10">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-white p-2 -mr-2"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col gap-6 text-xl font-bold text-white mb-6">
            <a 
              href="#about" 
              onClick={handleLinkClick}
              className="hover:text-amber-400 transition-colors"
            >
              {t.about}
            </a>
            <a 
              href="#services" 
              onClick={handleLinkClick}
              className="hover:text-amber-400 transition-colors"
            >
              {t.services}
            </a>
            <a 
              href="#contact" 
              onClick={handleLinkClick}
              className="hover:text-amber-400 transition-colors"
            >
              {t.contact}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;