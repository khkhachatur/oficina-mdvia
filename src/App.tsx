import { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Schematic from './components/Schematic';
import Privacy from './components/Privacy'; 
import { translations } from './lib/translations'; 
import ReactGA from "react-ga4";

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
    <Router>
      <div className="min-h-screen bg-black text-white font-sans">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar t={t.nav} currentLang={lang} onToggleLang={toggleLang} />
              <Hero t={t.hero} />
              <AboutUs t={t.about} />
              <Services t={t.services} />
              <Schematic t={t.services} />
              <Contact t={t.contact} />
            </>
          } />

          <Route path="/privacy" element={<Privacy currentLang={lang} />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;