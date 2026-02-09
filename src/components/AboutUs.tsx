import { ArrowUpRight } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="relative z-10 py-20 px-4 max-w-[1120px] mx-auto">
        <h2 className="text-2xl font-bold uppercase mb-12">About Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 h-[300px]">
             <img src="/images/engine.png" alt="Engine" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"/>
             <div className="absolute bottom-0 left-0 p-6">
               <h3 className="text-4xl font-bold mb-1">10+</h3>
               <p className="text-gray-300 text-sm">Year On Market</p>
             </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 h-[300px]">
             <img src="/images/turbo.png" alt="Turbo" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"/>
             <div className="absolute bottom-0 left-0 p-6">
               <p className="text-lg font-bold leading-tight uppercase">
                 Parts Import From All Around The World
               </p>
             </div>
          </div>

           <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 h-[300px]">
             <img src="/images/key.png" alt="Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"/>
             <div className="absolute bottom-0 right-0 p-6 text-right">
                <div className="mb-4 flex justify-end">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
               <h3 className="text-4xl font-bold mb-1">10K+</h3>
               <p className="text-gray-300 text-sm">Satisfied Clients</p>
             </div>
          </div>
        </div>
      </section>
  )
}

export default AboutUs