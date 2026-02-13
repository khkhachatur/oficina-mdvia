import { useState } from 'react'; 
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import { translations } from './translations'; 
import Schematic from './components/Schematic';

const App = () => {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');

  const t = translations[lang];

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans ">
      <Navbar t={t.nav} currentLang={lang} onToggleLang={toggleLang} />
      <Hero t={t.hero} />
      <AboutUs t={t.about} />
      <Services t={t.services} />
      <Schematic t={t.services} />
      <Contact t={t.contact} />
    </div>
  );
};

export default App;