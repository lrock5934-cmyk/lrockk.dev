import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { googleSignIn, getAccessToken, sendGmailInquiry, initGoogleAuth } from '../lib/googleAuth';
import { Phone, MessageSquare, Mail, Send, CheckCircle2, Loader2, ExternalLink, ShieldCheck } from 'lucide-react';

export function Contact() {
  const [name, setName] = useState('');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; phone: string; message: string; emailSent?: boolean } | null>(null);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);

  useEffect(() => {
    const unsub = initGoogleAuth(
      (_user, token) => setAccessToken(token),
      () => setAccessToken(null)
    );
    return () => unsub();
  }, []);

  const handleConnectGmail = async () => {
    setIsConnectingGoogle(true);
    setError('');
    try {
      const res = await googleSignIn();
      if (res) {
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      setError('Google Sign-in failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsConnectingGoogle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Save to Supabase contact_messages table
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            phone_whatsapp: phoneWhatsapp,
            message,
            status: 'new'
          }
        ]);

      if (dbError) throw dbError;

      // 2. If Google access token is available, send email to lrock5934@gmail.com via Gmail API
      let emailSent = false;
      let currentAccessToken = accessToken || await getAccessToken();
      if (currentAccessToken) {
        try {
          await sendGmailInquiry(name, phoneWhatsapp, message, currentAccessToken);
          emailSent = true;
        } catch (mailErr) {
          console.warn('Gmail API sending note:', mailErr);
        }
      }

      setSuccessData({ name, phone: phoneWhatsapp, message, emailSent });
      setName('');
      setPhoneWhatsapp('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit contact message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppIntent = () => {
    if (!successData) return;
    const text = encodeURIComponent(`Hello LRock, my name is ${successData.name}. ${successData.message}`);
    const whatsappUrl = `https://wa.me/233536759904?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#1E293B] border border-[#14B8A6]/30 rounded-full text-[#14B8A6] font-semibold text-xs tracking-wider uppercase mb-3">
            Get In Touch & Gmail Integration
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contact LRock.dev
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg">
            Messages are safely saved to Supabase and instantly forwarded to <span className="text-[#14B8A6] font-medium">lrock5934@gmail.com</span> via Gmail API.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Direct Action Buttons Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1E293B] border border-[#14B8A6]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Direct Channels</h3>

              <div className="space-y-4">
                {/* Call */}
                <a
                  href="tel:0536759904"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0A192F] hover:bg-slate-800 border border-slate-700 transition group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/20 text-[#14B8A6] flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Direct Call</span>
                    <span className="text-white font-bold text-base">0536759904</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/233536759904"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0A192F] hover:bg-slate-800 border border-slate-700 transition group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">WhatsApp Instant Chat</span>
                    <span className="text-white font-bold text-base">+233 53 675 9904</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:lrock5934@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0A192F] hover:bg-slate-800 border border-slate-700 transition group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/20 text-[#14B8A6] flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Gmail Account</span>
                    <span className="text-white font-bold text-sm truncate block">lrock5934@gmail.com</span>
                  </div>
                </a>
              </div>

              {/* Gmail API Connection status widget */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Gmail API Forwarder</span>
                  {accessToken ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                      Connected
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                      Optional Connect
                    </span>
                  )}
                </div>

                {accessToken ? (
                  <p className="text-xs text-slate-300">
                    Ready to send client inquiries directly to <span className="text-[#14B8A6] font-semibold">lrock5934@gmail.com</span>.
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-slate-300 mb-3">
                      Connect your Google account to enable direct Gmail API forwarding for incoming client messages.
                    </p>
                    <button
                      onClick={handleConnectGmail}
                      disabled={isConnectingGoogle}
                      className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                    >
                      {isConnectingGoogle ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                      ) : (
                        <>
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.21 21.32 7.28 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.5-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.13 0 9.89 0 11.7s.43 3.57 1.19 5.12l4.09-2.55z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.28 0 3.21 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                          </svg>
                          <span>Connect Gmail for lrock5934@gmail.com</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-6">Send a Project Inquiry</h3>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs">
                {error}
              </div>
            )}

            {successData ? (
              <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500 text-[#0A192F] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-slate-300">
                  Thank you, <span className="text-[#14B8A6] font-semibold">{successData.name}</span>. Your message has been saved to Supabase
                  {successData.emailSent && ' and successfully dispatched to lrock5934@gmail.com via Gmail API'}.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={openWhatsAppIntent}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center justify-center space-x-2 text-xs cursor-pointer shadow-lg"
                  >
                    <span>Launch WhatsApp Chat Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSuccessData(null)}
                    className="px-6 py-3 bg-[#0A192F] hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition text-xs border border-slate-700 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Name <span className="text-[#14B8A6]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full px-4 py-3 bg-[#0A192F] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#14B8A6] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone or WhatsApp Number <span className="text-[#14B8A6]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneWhatsapp}
                    onChange={(e) => setPhoneWhatsapp(e.target.value)}
                    placeholder="e.g. +233 24 123 4567"
                    className="w-full px-4 py-3 bg-[#0A192F] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#14B8A6] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Project Message / Requirements <span className="text-[#14B8A6] x">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your web or mobile app project, goals, and timeline..."
                    className="w-full px-4 py-3 bg-[#0A192F] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#14B8A6] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0A192F] font-extrabold rounded-xl transition shadow-xl shadow-[#14B8A6]/20 flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
