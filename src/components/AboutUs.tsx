import React, { useState, useEffect } from 'react';
import Titles from "./Titles";
import { Play, Pause } from 'lucide-react';

const AboutUs = ({ t }: { t: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play slider logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 3000); // Changes slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="about" className="relative z-10 py-20 px-4 max-w-[1120px] mx-auto">
        <Titles title={t?.title || "About Us"} />
        
        {/* ========================================== */}
        {/* DESKTOP VERSION (Untouched, hidden on mobile) */}
        {/* ========================================== */}
        <div className="hidden md:flex flex-col gap-10">
          
          <div className="group relative w-full h-[400px] rounded-2xl glass-panel overflow-hidden">
             <div className="absolute top-1/2 -translate-y-1/2 left-16 z-20 text-left">
               <h3 className="text-8xl font-bold mb-2 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                 10+
               </h3>
               <p className="text-gray-300 text-xl font-medium">
                 {t?.years || "Years On Market"}
               </p>
             </div>
             <div className="absolute bottom-0 right-0 w-[60%] h-[110%] z-10">
                <img 
                    src="/images/engine.png" 
                    alt="Engine" 
                    className="w-full h-full object-contain object-right-bottom opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="group relative h-[400px] rounded-2xl glass-panel overflow-hidden">
                 <div className="absolute bottom-0 -left-10 w-[70%] h-[80%] z-10">
                    <img 
                        src="/images/turbo.png" 
                        alt="Turbo" 
                        className="w-full h-full object-contain object-left-bottom opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                 </div>
                 <div className="absolute top-1/2 -translate-y-1/2 right-12 z-20 text-right max-w-[180px]">
                   <p className="text-2xl font-bold leading-tight uppercase bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                     {t.parts || "Parts Import From All Around The"}
                   </p>
                   <h3 className="text-4xl uppercase font-bold mb-2 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                     {t.world || "WORLD"}
                   </h3>
                 </div>
            </div>

            <div className="group relative h-[400px] rounded-2xl glass-panel overflow-hidden flex flex-col items-center">
                 <div className="w-full h-[55%] relative z-10 ">
                    <img 
                        src="/images/key.png" 
                        alt="Dashboard/Key" 
                        className="w-full h-full top-0 object-contain object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                 </div>
                 <div className="mt-auto pb-10 text-center z-20">
                   <h3 className="text-5xl font-bold mb-1 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                     10K+
                   </h3>
                   <p className="text-gray-300 text-lg font-medium">{t.clients || "Happy Clients"}</p>
                 </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* MOBILE VERSION (Slider, hidden on desktop) */}
        {/* ========================================== */}
        <div className="flex md:hidden flex-col items-center w-full">
          
          {/* Slider Container */}
          <div className="relative w-full h-[380px] overflow-hidden rounded-2xl border border-white/5">
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >

              <div className="w-full h-full flex-shrink-0 relative glass-panel flex flex-col items-center pb-10">
                <div className="w-[80%] h-[65%] relative z-10">
                  <img src="/images/key.png" alt="Key" className="w-full h-full object-contain object-top opacity-90" />
                </div>
                <div className="mt-auto text-center z-20">
                  <h3 className="text-6xl font-bold mb-1 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                    10K+
                  </h3>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    {t?.clients || "Satisfied Clients"}
                  </p>
                </div>
              </div>
              
              <div className="w-full h-full flex-shrink-0 relative glass-panel flex flex-col items-center pt-10">
                <div className="text-center z-20">
                  <h3 className="text-6xl font-bold mb-1 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                    12+
                  </h3>
                  <p className="text-gray-300 text-sm font-medium">
                    {t?.years || "Year On Market"}
                  </p>
                </div>
                <div className="absolute bottom-0 w-[95%] h-[60%] z-10">
                  <img src="/images/engine.png" alt="Engine" className="w-full h-full object-contain object-bottom opacity-90" />
                </div>
              </div>


              <div className="w-full h-full flex-shrink-0 relative glass-panel flex flex-col items-center pt-8 px-6 text-center">
                <div className="z-20">
                  <p className="text-sm font-bold uppercase tracking-wide text-gray-300">
                    {t?.parts || "Parts Import From"}
                  </p>
                  <h3 className="text-xl font-bold uppercase bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                    {t?.world || "All Around The World"}
                  </h3>
                </div>
                <div className="absolute bottom-6 w-[85%] h-[65%] z-10">
                  <img src="/images/turbo-mob.png" alt="Turbo" className="w-full h-full object-contain object-bottom opacity-90" />
                </div>
              </div>



            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-4 mt-6">
            
            {/* Dots Pill */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-4 py-3 shadow-inner">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setIsPlaying(false); // Pause auto-play if user manually clicks
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === idx ? 'w-8 h-2 bg-white/30' : 'w-2 h-2 bg-white/10'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors shadow-inner"
              aria-label={isPlaying ? "Pause slider" : "Play slider"}
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="ml-1" />
              )}
            </button>

          </div>
        </div>

      </section>
  )
}

export default AboutUs;