import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Schematic = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const video = videoRef.current;
      
      // 1. MASTER TIMELINE (Pins the section)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Very long scroll for 3 phases
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // --- PHASE 1: DIAGNOSTICS TEXT CYCLE (Right Side) ---
      // We cycle through the first 3 diagnostic items while car is static
      const diagItems = gsap.utils.toArray('.diag-item');
      
      // Hide all except first initially
      gsap.set(diagItems, { autoAlpha: 0, x: 20 });
      gsap.set(diagItems[0], { autoAlpha: 1, x: 0 });

      diagItems.forEach((item: any, i) => {
        if (i === 0) return;
        tl.to(diagItems[i-1], { autoAlpha: 0, x: -10, duration: 1 }) // Fade out prev
          .to(item, { autoAlpha: 1, x: 0, duration: 1 });            // Fade in current
      });
      
      // Fade out the last diagnostic item before split
      tl.to(diagItems[diagItems.length - 1], { autoAlpha: 0, x: -10, duration: 1 });


      // --- PHASE 2: THE SPLIT (Opening the Car) ---
      tl.addLabel("split")
        .to(".left-half", { xPercent: -40, duration: 3, ease: "power2.inOut" }, "split")
        .to(".right-half", { xPercent: 40, duration: 3, ease: "power2.inOut" }, "split")
        
        // Reveal Video Opacity slightly before split ends
        .fromTo(".video-layer", { opacity: 0 }, { opacity: 1, duration: 1 }, "split+=0.5");


      // --- PHASE 3: VIDEO SCRUB & REPAIR LIST ---
      // As we continue scrolling, we play the video and show the heavy repair list
      tl.addLabel("repair")
        .to(".repair-list", { autoAlpha: 1, x: 0, duration: 1 }, "repair")
        
        // This dummy tween drives the video scrubbing
        .to(video, { 
          currentTime: video?.duration || 5, // Scrub to end of video
          duration: 5, 
          ease: "none" 
        }, "repair");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-zinc-950 overflow-hidden flex flex-col items-center justify-center">
      
      {/* BACKGROUND GRID (Optional aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 w-full max-w-[1400px] h-full flex items-center justify-center px-4 md:px-10">
        
        {/* =========================================
            CENTER: THE SPLIT CAR & VIDEO 
        ========================================= */}
        <div className="relative w-full md:w-3/5 h-[60vh] md:h-[80vh] flex items-center justify-center">
            
            {/* 1. VIDEO LAYER (Underneath) */}
            <div className="video-layer absolute inset-0 flex items-center justify-center opacity-0 z-0">
               <video 
                  ref={videoRef}
                  src="/videos/land300-schematic.mp4" 
                  className="w-[80%] h-full object-contain"
                  muted playsInline preload="auto"
               />
            </div>

            {/* 2. LEFT HALF (Clipped) */}
            <div className="left-half absolute inset-0 z-10 w-full h-full pointer-events-none">
               <img 
                  src="/images/land300-top.png" // MAKE SURE YOU HAVE THIS IMAGE
                  alt="Car Left" 
                  className="w-full h-full object-contain"
                  style={{ clipPath: 'inset(0 50% 0 0)' }} // Shows only left side
               />
            </div>

            {/* 3. RIGHT HALF (Clipped) */}
            <div className="right-half absolute inset-0 z-10 w-full h-full pointer-events-none">
               <img 
                  src="/images/land300-top.png" 
                  alt="Car Right" 
                  className="w-full h-full object-contain"
                  style={{ clipPath: 'inset(0 0 0 50%)' }} // Shows only right side
               />
            </div>
        </div>


        {/* =========================================
            RIGHT SIDE: TEXT CONTENT
        ========================================= */}
        <div className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 w-[300px] md:w-[400px] text-right pointer-events-none z-20">
            
            {/* CONTAINER 1: DIAGNOSTICS (Cycle Items) */}
            <div className="relative h-[200px]">
                {/* Item 1 */}
                <div className="diag-item absolute top-0 right-0 w-full">
                    <h3 className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">01</h3>
                    <h4 className="text-xl md:text-3xl font-bold text-white uppercase">{t?.services?.diagnostics_list?.electronic}</h4>
                    <p className="text-gray-400 mt-2">Full system scan using latest OBD-II tools.</p>
                </div>
                {/* Item 2 */}
                <div className="diag-item absolute top-0 right-0 w-full opacity-0">
                    <h3 className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">02</h3>
                    <h4 className="text-xl md:text-3xl font-bold text-white uppercase">{t?.services?.diagnostics_list?.mechanical}</h4>
                    <p className="text-gray-400 mt-2">Comprehensive engine and chassis check.</p>
                </div>
                {/* Item 3 */}
                <div className="diag-item absolute top-0 right-0 w-full opacity-0">
                    <h3 className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">03</h3>
                    <h4 className="text-xl md:text-3xl font-bold text-white uppercase">{t?.services?.diagnostics_list?.alignment}</h4>
                    <p className="text-gray-400 mt-2">Laser precision 3D wheel alignment.</p>
                </div>
            </div>

            {/* CONTAINER 2: REPAIR LIST (Appears after split) */}
            <div className="repair-list absolute top-0 right-0 w-full opacity-0 invisible translate-y-10">
                <h3 className="text-amber-400 text-lg font-bold tracking-widest uppercase mb-4 border-b border-amber-400/30 pb-2">
                    {t?.services?.repairs_title}
                </h3>
                <ul className="space-y-4">
                    <li className="text-white text-xl font-medium">{t?.services?.repairs_list?.gearbox}</li>
                    <li className="text-white text-xl font-medium">{t?.services?.repairs_list?.engine}</li>
                    <li className="text-white text-xl font-medium">{t?.services?.repairs_list?.suspension}</li>
                    <li className="text-gray-400 text-sm mt-4 italic">Watching internal schematic...</li>
                </ul>
            </div>

        </div>

      </div>
    </section>
  );
};

export default Schematic;