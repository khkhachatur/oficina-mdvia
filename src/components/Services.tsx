import React from 'react'

const Services = ({ t }) => {
  return (
    <section id="services" className="relative z-10 py-20 text-center">
        <h2 className="text-2xl font-bold uppercase mb-2">{t.title}</h2>
        <h3 className="text-amber-400 font-bold mb-12 uppercase tracking-wider">{t.wash}</h3>
        
        <div className="relative w-full max-w-5xl mx-auto h-[300px] md:h-[400px]">
             <img 
            src="/images/911-1.png" 
            alt="Dirty Porsche" 
            className="w-full h-full object-contain mx-auto"
          />
        </div>
      </section>
  )
}

export default Services