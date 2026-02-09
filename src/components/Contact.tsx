import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';

const Contact = ({ t }) => {
  return (
    <section id="contact" className="relative z-10 py-20 px-4 max-w-[1120px] mx-auto">
        <div className="absolute left-0 -top-10 text-[100px] md:text-[200px] font-bold text-white/5 pointer-events-none select-none overflow-hidden w-full text-center z-0">
          {t.background}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-full border border-white/20">
                    <span className="text-xs">?</span>
                </div>
                <span className="text-sm font-medium">{t.label}</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              {t.subtitle}
            </p>

            <div className="space-y-4">
              <ContactButton icon={<Mail size={18}/>} label={t.buttons.email} sub="oficina@mdvia.net" />
              <ContactButton icon={<Phone size={18}/>} label={t.buttons.call} sub="+244 939 800 778" />
              <ContactButton icon={<MapPin size={18}/>} label={t.buttons.location} sub="Rua Direita do BFA Futungo de Belas, Luanda" />
            </div>

            <div className="flex gap-4 mt-12">
                <MessageCircle size={20} className="hover:text-amber-400 cursor-pointer"/>
            </div>
          </div>

          <div className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-[10px] p-8">
            <form className="space-y-4">
              <div className="space-y-1">
                <Input placeholder={t.form.name} />
              </div>
              <div className="space-y-1">
                <Input placeholder={t.form.email} type="email" />
              </div>
              <div className="space-y-1">
                <Input placeholder={t.form.phone} type="tel" />
              </div>
              <div className="space-y-1">
                <textarea 
                  placeholder={t.form.message} 
                  rows="4"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-amber-400 text-white placeholder-gray-400 resize-none"
                />
              </div>
              <button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 rounded-md transition-all mt-2">
                {t.form.submit}
              </button>
            </form>
          </div>

        </div>
      </section>
  )
}

const ContactButton = ({ icon, label, sub }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-amber-400/50 transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-zinc-800 rounded-lg text-gray-300 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs text-gray-400 font-bold uppercase">{label}</span>
        <span className="text-sm text-white">{sub}</span>
      </div>
    </div>
    <div className="p-2 rounded-full bg-zinc-800 group-hover:bg-amber-400 group-hover:text-black transition-colors">
      <ArrowUpRight size={16} />
    </div>
  </div>
);

const Input = ({ placeholder, type = "text" }) => (
  <input 
    type={type}
    placeholder={placeholder}
    className="w-full bg-zinc-800/50 border border-white/10 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-amber-400 text-white placeholder-gray-400"
  />
);

export default Contact