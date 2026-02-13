import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Schematic = ({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. SAFE DATA EXTRACTION
  // This handles whether you passed the full 't' object OR just 't.services'
  const servicesData = t?.services || t; 
  
  const diagList = servicesData?.diagnostics_list 
    ? Object.values(servicesData.diagnostics_list) 
    : ["Diagnostic Check", "Mechanical", "Systems", "Alignment", "AC"]; // Fallback text

  const repairList = servicesData?.repairs_list 
    ? Object.values(servicesData.repairs_list) 
    : ["Gearbox", "Engine", "Suspension"]; // Fallback text

  const repairTitle = servicesData?.repairs_title || "Heavy Repair";

  // TIMINGS (Seconds)
  const repairTimings = [0, 3, 5]; 

  useLayoutEffect(() => {
    // Safety check: Don't run animation if ref is missing
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      
      const video = videoRef.current;
      // Scoped selectors ensure we only grab items inside THIS component
      const diagItems = gsap.utils.toArray('.diag-item');
      const repairItems = gsap.utils.toArray('.repair-item');

      // RESET STATE (Ensure they start hidden, except the first one handled by logic)
      gsap.set(diagItems, { autoAlpha: 0, x: -50 });
      gsap.set(repairItems, { autoAlpha: 0, x: -50 });
      
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
        // Force first item visible immediately
        gsap.set(diagItems[0], { autoAlpha: 1, x: 0 });

        diagItems.forEach((item: any, i) => {
          if (i === 0) return;
          tl.to(diagItems[i-1], { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" }) 
            .fromTo(item, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" });            
        });
        
        // Fade out last diagnostic item
        tl.to(diagItems[diagItems.length - 1], { autoAlpha: 0, y: -30, duration: 0.5 });
      }

      // --- PHASE 2: SPLIT ---
      tl.addLabel("split");
      tl.to(".car-top", { y: -200, duration: 2, ease: "power2.inOut" }, "split")
        .to(".car-bottom", { y: 200, duration: 2, ease: "power2.inOut" }, "split")
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
            
            // Fade In
            tl.to(item, { autoAlpha: 1, x: 0, duration: 0.5 }, insertionTime);
            
            // Fade Out
            if (i < repairItems.length - 1) {
                 const nextStartTime = repairTimings[i+1] !== undefined ? repairTimings[i+1] : videoDuration;
                 const durationVisible = nextStartTime - startTime;
                 tl.to(item, { autoAlpha: 0, x: 50, duration: 2.5 }, insertionTime + "+" + (durationVisible + 2));
            }
        });
      }

    }, containerRef); // Scope to container

    return () => ctx.revert();
  }, [servicesData]); // Re-run if data changes

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

      <div className="relative z-10 w-full max-w-[1600px] h-full flex items-center justify-center px-4 md:px-10">
        
        {/* ================= LABELS (High Z-Index) ================= */}
        <div className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] text-left pointer-events-none z-[100]">
            
            {/* DIAGNOSTICS */}
            <div className="relative h-[250px] flex items-center">
                {diagList.map((text: any, i: number) => (
                    <div 
                      key={`diag-${i}`} 
                      className="diag-item absolute top-0 left-0 w-full"
                      // Force first item visible via Tailwind just in case JS lags
                      style={{ opacity: i === 0 ? 1 : 0 }} 
                    >
                        <span className="text-8xl font-black text-amber-400/10 absolute -top-10 -left-6 -z-10 select-none">
                          0{i + 1}
                        </span>
                        <h3 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4 drop-shadow-xl leading-tight uppercase">
                            {text}
                        </h3>
                        <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* REPAIRS */}
            <div className="relative h-[250px] -mt-[250px] flex items-center"> 
                {repairList.map((text: any, i: number) => (
                    <div key={`repair-${i}`} className="repair-item absolute top-0 left-0 w-full opacity-0">
                        <span className="text-8xl font-black text-white/5 absolute -top-10 -left-6 -z-10 select-none">
                          0{i + 1}
                        </span>
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl leading-none uppercase tracking-tighter">
                            {text}
                        </h3>
                        <p className="text-amber-400 font-bold tracking-widest uppercase text-sm">
                           {repairTitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* ================= CAR & VIDEO ================= */}
        <div className="relative w-full md:w-3/5 h-[60vh] md:h-[80vh] md:ml-auto flex items-center justify-center">
            
            {/* Video Layer */}
            <div className="video-layer absolute inset-0 flex items-center justify-center opacity-0 z-0">
               <video 
                  ref={videoRef}
                  src="/videos/land300-schematic.mp4" 
                  className="w-[95%] h-full object-contain mix-blend-screen"
                  muted playsInline preload="auto"
               />
            </div>

            {/* Car Split Layer */}
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
    </section>
  );
};

export default Schematic;