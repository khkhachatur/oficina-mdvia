
const Hero = ({ t }) => {
  return (
    <section className="relative z-10 pt-40 pb-20 flex flex-col items-center text-center px-4">
        <div className="relative h-full w-full my-8">
          <img 
            src="/images/hero.jpg" 
            alt="Porsche 911" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6 w-full">
            {t.title_start} <span className="text-amber-400">{t.title_highlight}</span> {t.title_end}
            </h1>
            
            <p className="text-gray-400 text-sm md:text-base tracking-widest mb-8 mt-96">
              {t.subtitle}
            </p>
        </div>

        <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-full transition-all mt-8">
          {t.button}
        </button>
      </section>
  )
}

export default Hero