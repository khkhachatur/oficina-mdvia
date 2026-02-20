export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// 1. Email sent to your team (oficina@mdvia.net)
export const generateTeamEmail = (data: ContactFormData) => {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #121212; color: #ffffff; border: 1px solid #333333; border-radius: 8px;">
      <h2 style="color: #fbbf24; border-bottom: 1px solid #333333; padding-bottom: 15px; margin-top: 0;">New Contact Form Submission</h2>
      
      <p style="color: #ffffff; font-size: 16px; margin-bottom: 8px;"><strong>From:</strong> ${data.name}</p>
      <p style="color: #ffffff; font-size: 16px; margin-bottom: 8px;"><strong>Email:</strong> ${data.email}</p>
      <p style="color: #ffffff; font-size: 16px; margin-bottom: 8px;"><strong>Phone:</strong> ${data.phone}</p>
      
      <div style="margin-top: 30px; padding: 20px; background-color: #1e1e1e; border-left: 4px solid #fbbf24; border-radius: 0 8px 8px 0;">
        <p style="margin-top: 0; margin-bottom: 10px; color: #fbbf24; font-size: 14px; font-weight: bold; text-transform: uppercase;">Message:</p>
        <p style="white-space: pre-wrap; line-height: 1.6; color: #ffffff; font-size: 16px; margin: 0;">${data.message}</p>
      </div>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333333; text-align: center;">
        <p style="font-size: 12px; color: #777777; margin: 0;">Sent from MDVIA Oficina Website</p>
      </div>
    </div>
  `;
};

// 2. Email sent to the client (Auto-reply)
export const generateClientEmail = (data: ContactFormData, t: any) => {
  const title = t?.autoReply?.title || "Recebemos a sua mensagem!";
  const greeting = t?.autoReply?.greeting || `Olá ${data.name},`;
  const body = t?.autoReply?.body || "Obrigado por contactar a MDVIA Oficina. Recebemos a sua mensagem e a nossa equipa entrará em contacto consigo em breve através deste email ou do número fornecido.";
  
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; color: #333333; border-top: 6px solid #fbbf24; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <h2 style="color: #111111; margin-top: 0;">${title}</h2>
      
      <p style="font-size: 16px; color: #333333;">${greeting}</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444444;">${body}</p>
      
      <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #eeeeee;">
        <p style="margin: 0; font-weight: bold; font-size: 16px; color: #111111;">MDVIA Oficina</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666666;">Rua Direita do BFA Futungo de Belas, Luanda</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666666;">+244 939 800 778 | oficina@mdvia.net</p>
      </div>
    </div>
  `;
};