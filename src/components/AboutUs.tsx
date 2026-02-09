import Titles from "./Titles";

const AboutUs = ({ t }: { t: any }) => {
  return (
    <section id="about" className="relative z-10 py-20 px-4 max-w-[1120px] mx-auto">
        <Titles title={t.title} />
        
        <div className="flex flex-col gap-10">
          
          <div className="group relative w-full h-[350px] md:h-[400px] rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden">
             
             <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 z-20 text-left">
               <h3 className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                 10+
               </h3>
               <p className="text-gray-300 text-lg md:text-xl font-medium">
                 {t.years}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="group relative h-[350px] md:h-[400px] rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden">
                 
                 <div className="absolute bottom-0 -left-10 w-[70%] h-[80%] z-10">
                    <img 
                        src="/images/turbo.png" 
                        alt="Turbo" 
                        className="w-full h-full object-contain object-left-bottom opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                 </div>

                 <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 z-20 text-right max-w-[180px]">
                   <p className="text-xl md:text-2xl font-bold leading-tight uppercase bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                     {t.parts}
                   </p>
                   <h3 className="text-4xl md:text-4xl uppercase font-bold mb-2 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                  {t.world}
                    </h3>
                 </div>
            </div>

            <div className="group relative h-[350px] md:h-[400px] rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden flex flex-col items-center">
                 
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
                   <p className="text-gray-300 text-lg font-medium">{t.clients}</p>
                 </div>
            </div>

          </div>
        </div>
      </section>
  )
}

export default AboutUs;