import React, { useRef, useState } from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, Copy, Check } from 'lucide-react';
import Socials from './Social';

const Contact = ({ t }: { t: any }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--x', `${x}px`);
    btnRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <section id="contact" className="relative z-10 pt-30 pb-20 px-4 max-w-[1120px] mx-auto">
       <div className="absolute left-0 -top-20 text-[100px] md:text-[200px] font-bold pointer-events-none select-none overflow-hidden w-full text-center z-0 bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent">
        {t.background}
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-5 mb-6 px-4 py-2 rounded-full border border-white/20 w-max bg-white/5 backdrop-blur-sm">
                <div className="p-2 rounded-full border border-white/20 bg-white/5">
                  <img src="/icons/contact.svg" alt="Contact Icon" className="w-4 h-4" />  
                </div>
                <span className="text-[16px] font-medium pr-2 text-white">{t.label}</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 text-white">{t.title}</h2>
            <p className="text-gray-400 mb-8 max-w-sm text-lg">
              {t.subtitle}
            </p>

            <div className="space-y-4">
              <ContactButton 
                icon={<Mail size={20}/>} 
                label={t.buttons.email} 
                sub="oficina@mdvia.net" 
                copyValue="oficina@mdvia.net"
                href="mailto:oficina@mdvia.net"
              />
              <ContactButton 
                icon={<Phone size={20}/>} 
                label={t.buttons.call} 
                sub="+244 939 800 778" 
                copyValue="+244 939 800 778"
                href="tel:+244939800778"
              />
              <ContactButton 
                icon={<MapPin size={20}/>} 
                label={t.buttons.location} 
                sub="Rua Direita do BFA Futungo de Belas, Luanda" 
                href="https://maps.google.com/?q=Rua+Direita+do+BFA+Futungo+de+Belas,+Luanda"
              />
            </div>
          </div>

          <div className="w-full h-full flex flex-col justify-center">
            
            <div className="glass-panel rounded-2xl p-8 w-full">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                    rows={4}
                    className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-amber-400 focus:bg-black/40 text-white placeholder-white/40 resize-none transition-all shadow-inner backdrop-blur-md"
                  />
                </div>
                
                <button
                  ref={btnRef}
                  onMouseMove={handleMouseMove}
                  className="group relative w-full overflow-hidden bg-amber-400 text-black font-bold py-4 rounded-full transition-all mt-4 uppercase tracking-widest shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.6)] hover:scale-[1.02] active:scale-[0.98] duration-300"
                >
                  <span className="relative z-10 pointer-events-none">
                    {t.form.submit}
                  </span>
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(150px circle at var(--x) var(--y), rgba(255,255,255,0.5), transparent 40%)'
                    }}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
            <Socials />
        </div>
      </section>
  )
}

const ContactButton = ({ icon, label, sub, href, copyValue }: { icon: any, label: string, sub: string, href: string, copyValue?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (copyValue) {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 glass-panel hover:border-amber-400/50 hover:bg-zinc-900/60 transition-all group cursor-pointer backdrop-blur-md shadow-lg hover:shadow-amber-900/10"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-lg text-gray-300 group-hover:text-white group-hover:bg-zinc-700 transition-colors glass-panel">
          {icon}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-white font-medium">{sub}</span>
            {copyValue && (
              <button 
                onClick={handleCopy} 
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-2 rounded-full bg-white/5 group-hover:bg-amber-400 group-hover:text-black transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1">
        <ArrowUpRight size={18} />
      </div>
    </a>
  );
};

const Input = ({ placeholder, type = "text" }: { placeholder: string, type?: string }) => (
  <input 
    type={type}
    placeholder={placeholder}
    className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-amber-400 focus:bg-black/40 text-white placeholder-white/40 transition-all shadow-inner backdrop-blur-md"
  />
);

export default Contact;