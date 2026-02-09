import { useState } from 'react'; 
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import { translations } from './translations'; 

const App = () => {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');

  const t = translations[lang];

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Pass text (t) and toggle function to components */}
      <Navbar t={t.nav} currentLang={lang} onToggleLang={toggleLang} />
      <Hero t={t.hero} />
      <AboutUs t={t.about} />
      <Services t={t.services} />
      <Contact t={t.contact} />
    </div>
  );
};

export default App;