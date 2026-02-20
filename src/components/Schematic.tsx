import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Schematic = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const servicesData = t?.services || t; 
  
  const diagList = servicesData?.diagnostics_list 
    ? Object.values(servicesData.diagnostics_list) 
    : ["Diagnostic Check", "Mechanical", "Systems", "Alignment", "AC"];

  const repairList = servicesData?.repairs_list 
    ? Object.values(servicesData.repairs_list) 
    : ["Gearbox", "Engine", "Suspension"];

  const repairTitle = servicesData?.repairs_title || "Heavy Repair";

  const repairTimings = [0, 3, 5]; 

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      
      const video = videoRef.current;
      const diagItems = gsap.utils.toArray('.diag-item');
      const repairItems = gsap.utils.toArray('.repair-item');

      // FIXED: Ensure x is always 0 so text-center works perfectly.
      // Now everything slides smoothly up and down using 'y: 30'
      gsap.set(diagItems, { autoAlpha: 0, x: 0, y: 30 });
      gsap.set(repairItems, { autoAlpha: 0, x: 0, y: 30 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // --- PHASE 1: DIAGNOSTICS ---
      if (diagItems.length > 0) {
        // First item starts perfectly centered and visible
        gsap.set(diagItems[0], { autoAlpha: 1, x: 0, y: 0 });

        diagItems.forEach((item: any, i) => {
          if (i === 0) return;
          tl.to(diagItems[i-1], { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" }) 
            .fromTo(item, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" });            
        });
        
        tl.to(diagItems[diagItems.length - 1], { autoAlpha: 0, y: -30, duration: 0.5 });
      }

      // --- PHASE 2: SPLIT ---
      tl.addLabel("split");
      
      const isMobile = window.innerWidth < 768;
      const splitDist = isMobile ? 100 : 200;

      tl.to(".car-top", { y: -splitDist, duration: 2, ease: "power2.inOut" }, "split")
        .to(".car-bottom", { y: splitDist, duration: 2, ease: "power2.inOut" }, "split")
        .fromTo(".video-layer", { opacity: 0 }, { opacity: 1, duration: 1 }, "split+=0.5");

      // --- PHASE 3: REPAIR SYNC ---
      tl.addLabel("repairStart");

      const videoDuration = 8; 
      
      tl.to(video, { 
        currentTime: video?.duration || videoDuration,
        duration: videoDuration, 
        ease: "none" 
      }, "repairStart");

      if (repairItems.length > 0) {
        repairItems.forEach((item: any, i) => {
            const startTime = repairTimings[i] !== undefined ? repairTimings[i] : (i * 2);
            const insertionTime = "repairStart+=" + startTime;
            
            // FIXED: Slides up into place
            tl.to(item, { autoAlpha: 1, y: 0, duration: 0.5 }, insertionTime);
            
            // FIXED: Slides up and out 
            if (i < repairItems.length - 1) {
                 const nextStartTime = repairTimings[i+1] !== undefined ? repairTimings[i+1] : videoDuration;
                 const durationVisible = nextStartTime - startTime;
                 tl.to(item, { autoAlpha: 0, y: -30, duration: 2.5 }, insertionTime + "+" + (durationVisible + 2));
            }
        });
      }

    }, containerRef); 

    return () => ctx.revert();
  }, [servicesData]); 

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Mask */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"
        style={{
            maskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 60%)'
        }}
      ></div>

      <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-10">
        
        {/* ================= LABELS ================= */}
        <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-24 top-32 md:top-1/2 md:-translate-y-1/2 w-[90%] md:w-[500px] text-center md:text-left pointer-events-none z-[100] flex flex-col items-center md:items-start">
            
            {/* DIAGNOSTICS */}
            <div className="relative h-[120px] md:h-[250px] w-full flex items-center justify-center md:justify-start">
                {diagList.map((text: any, i: number) => (
                    <div 
                      key={`diag-${i}`} 
                      className="diag-item absolute top-0 left-0 w-full flex flex-col items-center md:items-start"
                      style={{ opacity: i === 0 ? 1 : 0 }} 
                    >
                        <span className="hidden md:block text-8xl font-black text-amber-400/10 absolute -top-10 -left-6 -z-10 select-none">
                          0{i + 1}
                        </span>
                        <h3 className="text-2xl md:text-6xl font-bold text-amber-400 mb-2 md:mb-4 drop-shadow-xl leading-tight uppercase w-full text-center md:text-left">
                            {text}
                        </h3>
                        <div className="hidden md:block w-16 h-1 bg-white/20 rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* REPAIRS */}
            <div className="relative h-[120px] md:h-[250px] -mt-[120px] md:-mt-[250px] w-full flex items-center justify-center md:justify-start"> 
                {repairList.map((text: any, i: number) => (
                    <div key={`repair-${i}`} className="repair-item absolute top-0 left-0 w-full flex flex-col items-center md:items-start opacity-0">
                        <span className="hidden md:block text-8xl font-black text-white/5 absolute -top-10 -left-6 -z-10 select-none">
                          0{i + 1}
                        </span>
                        <h3 className="text-2xl md:text-6xl font-black text-white mb-1 md:mb-4 drop-shadow-2xl leading-none uppercase tracking-tighter w-full text-center md:text-left">
                            {text}
                        </h3>
                        <p className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm">
                           {repairTitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* ================= CAR & VIDEO ================= */}
        <div className="relative w-full md:w-3/5 h-[100vh] md:h-[80vh] md:ml-auto flex items-center justify-center pointer-events-none">
            
            <div className="w-[150%] md:w-full h-full flex flex-col items-center justify-center rotate-90 md:rotate-0 scale-[1.15] md:scale-100 translate-y-16 md:translate-y-0 transition-transform origin-center">
              
              <div className="video-layer absolute inset-0 flex items-center justify-center opacity-0 z-0">
                 <video 
                    ref={videoRef}
                    src="/videos/land300-schematic.mp4" 
                    className="w-[95%] h-full object-contain mix-blend-screen"
                    muted playsInline preload="auto"
                 />
              </div>

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  <div className="car-top w-full flex items-end justify-center -mb-[1px]">
                     <img 
                        src="/images/land300-top.png" 
                        alt="Car Top Half" 
                        className="w-full object-contain max-h-[40vh]"
                     />
                  </div>
                  <div className="car-bottom w-full flex items-start justify-center -mt-[1px]">
                     <img 
                        src="/images/land300-bottom.png" 
                        alt="Car Bottom Half" 
                        className="w-full object-contain max-h-[40vh]"
                     />
                  </div>
              </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default Schematic;