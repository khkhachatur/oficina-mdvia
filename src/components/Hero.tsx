import React, { useRef } from 'react'

const Hero = ({ t }: { t: any }) => {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btnRef.current.style.setProperty('--x', `${x}px`);
    btnRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
            <img 
              src="/images/hero.jpg" 
              alt="Porsche 911 hero image" 
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[65vw] h-[65vh] bg-amber-500/20 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pt-32 pb-12 px-4">
            <div className="text-center mt-5">
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white drop-shadow-2xl">
                    {t.title_start} <span className="text-amber-400">{t.title_highlight}</span> {t.title_end}
                </h1>
            </div>

            <div className="flex flex-col items-center gap-6 mb-10">
                <p className="text-gray-100 text-sm md:text-base tracking-[0.2em] font-semibold uppercase drop-shadow-md">
                    {t.subtitle}
                </p>

                <a 
                  ref={btnRef}
                  href="#contact"
                  onMouseMove={handleMouseMove}
                  aria-label={t.button}
                  className="group relative overflow-hidden bg-amber-400 text-black font-bold py-3 px-10 rounded-full transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95 duration-300"
                >
                  <span className="relative z-10 pointer-events-none">
                    {t.button}
                  </span>
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(150px circle at var(--x) var(--y), rgba(255,255,255,0.5), transparent 40%)'
                    }}
                  />
                </a>
            </div>
        </div>
    </section>
  )
}

export default Hero