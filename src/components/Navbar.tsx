const Navbar = ({ t, currentLang, onToggleLang }) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1120px] px-6">
        <div className="relative flex items-center justify-between h-[60px] rounded-[40px] border border-white/10 bg-[#010200]/20 backdrop-blur-md px-8">
          <div>
            <img 
            src="/icons/logo.svg" 
            alt="MDVIA logo" 
            className="w-full h-full object-contain "
          />
          </div>

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

export default Navbar