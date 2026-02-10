import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Titles from './Titles';


gsap.registerPlugin(ScrollTrigger);

const Services = ({ t }: { t: any }) => {
  const componentRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const frames = gsap.utils.toArray('.service-frame');

      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {    
          trigger: triggerRef.current, 
          start: "top top",            
          end: "+=2000",               
          scrub: 1,                    
          pin: true,                   
          anticipatePin: 1,
        }
      });

      frames.forEach((frame: any, i) => {
        if (i === 0) return; 
        
        tl.to(frames[i - 1], { autoAlpha: 0, duration: 1 }) 
          .to(frame, { autoAlpha: 1, duration: 1 }, "<");   
      });

    }, componentRef); 

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} id="services" className="relative z-10 bg-black">

      <div ref={triggerRef} className="relative z-10 py-20 px-4 max-w-[1120px] mx-auto">
             <Titles title={t?.services || "Services"} />
        <div className="relative w-full max-w-6xl h-[60vh] mt-20">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55vw] h-[65vh] bg-amber-500/20 blur-[120px] rounded-full mix-blend-screen" />
            <div className="service-frame absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-4xl md:text-6xl font-black text-amber-400 uppercase tracking-tighter mb-8 drop-shadow-lg text-center">
                    {t?.wash || "Car Wash"}
                </h3>
                <img 
                    src="/images/911-1.png" 
                    alt="Car Wash" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </div>

            <div className="service-frame absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-4xl md:text-6xl font-black text-amber-400 uppercase tracking-tighter mb-8 drop-shadow-lg text-center">
                    {t?.detailing || "Detailing"}
                </h3>
                <img 
                    src="/images/911-2.png" 
                    alt="Detailing" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </div>

            <div className="service-frame absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-4xl md:text-6xl font-black text-amber-400 uppercase tracking-tighter mb-8 drop-shadow-lg text-center">
                    {t?.painting || "Painting"}
                </h3>
                <img 
                    src="/images/911-3.png" 
                    alt="Painting" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </div>

        </div>
      </div>
    </section>
  );
};

export default Services;