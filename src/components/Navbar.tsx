import React from 'react';

const Navbar = ({ t, currentLang, onToggleLang }: { t: any, currentLang: string, onToggleLang: () => void }) => {
  
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault(); 
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1120px] px-6">
        <div className="relative flex items-center justify-between h-[60px] rounded-[40px] glass-panel px-8">

          <a href="#" onClick={scrollToTop} className="h-8 w-auto cursor-pointer">
              <img 
              src="/icons/logo.svg" 
              alt="MDVIA logo" 
              className="w-full h-full object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-white transition-colors">{t.about}</a>
            <a href="#services" className="hover:text-white transition-colors">{t.services}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.contact}</a>
          </div>

          <button 
            onClick={onToggleLang}
            className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer bg-transparent border-none p-0"
          >
            {currentLang === 'en' ? 'EN' : 'PT'}
          </button>
        </div>
      </nav>
  )
}

export default Navbar;