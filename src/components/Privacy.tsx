import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Privacy = ({ currentLang }: { currentLang: string }) => {
  const isEn = currentLang === 'en';

  return (
    <div className="min-h-screen bg-black text-gray-300 py-20 px-4 md:px-10">
      <div className="max-w-[800px] mx-auto glass-panel p-8 md:p-12 rounded-3xl relative">
        
        {/* Back Button */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          {isEn ? "Back to Home" : "Voltar ao Início"}
        </a>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tight">
          {isEn ? "Privacy Policy" : "Política de Privacidade"}
        </h1>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. {isEn ? "Introduction" : "Introdução"}</h2>
            <p>
              {isEn 
                ? "Welcome to MDVIA Oficina. This Privacy Policy explains how MDVIA Angola ld (NIF: 5417122297) collects, uses, and protects your personal information when you use our website."
                : "Bem-vindo à MDVIA Oficina. Esta Política de Privacidade explica como a MDVIA Angola ld (NIF: 5417122297) recolhe, utiliza e protege as suas informações pessoais ao utilizar o nosso website."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. {isEn ? "Data We Collect" : "Dados que Recolhemos"}</h2>
            <p>
              {isEn 
                ? "When you fill out our contact form, we collect the following information: Name, Email Address, Phone Number, and any details provided in your message."
                : "Quando preenche o nosso formulário de contacto, recolhemos as seguintes informações: Nome, Endereço de Email, Número de Telefone e quaisquer detalhes fornecidos na sua mensagem."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. {isEn ? "How We Use Your Data" : "Como Utilizamos os Seus Dados"}</h2>
            <p>
              {isEn 
                ? "The data collected is strictly used to communicate with you regarding your inquiries, provide quotes, schedule appointments, and offer our mechanical repair services. We do not sell or share your data with third parties for marketing purposes."
                : "Os dados recolhidos são estritamente utilizados para comunicar consigo relativamente às suas questões, fornecer orçamentos, agendar marcações e oferecer os nossos serviços de reparação mecânica. Não vendemos nem partilhamos os seus dados com terceiros para fins de marketing."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. {isEn ? "Contact Us" : "Contacte-nos"}</h2>
            <p>
              {isEn 
                ? "If you have any questions about this Privacy Policy or wish to request the deletion of your data, please contact us at: "
                : "Se tiver alguma dúvida sobre esta Política de Privacidade ou desejar solicitar a eliminação dos seus dados, por favor contacte-nos em: "}
              <br/><br/>
              <strong className="text-white">MDVIA Angola ld</strong><br/>
              NIF: 5417122297<br/>
              Email: oficina@mdvia.net<br/>
              Phone: +244 939 800 778<br/>
              Address: Rua Direita do BFA Futungo de Belas, Luanda, Angola
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;