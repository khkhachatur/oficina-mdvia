import { useEffect, useState } from 'react'; 
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import { translations } from './lib/translations'; 
import Schematic from './components/Schematic';

import ReactGA from "react-ga4";

// ReactGA.initialize("GOOGLE_ANALITICS"); 
// ReactGA.send({ hitType: "pageview", page: window.location.pathname });

const App = () => {

useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (trackingId) {
      ReactGA.initialize(trackingId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Home Page" });
    } else {
      console.warn("Google Analytics tracking ID is missing!");
    }
  }, []);

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