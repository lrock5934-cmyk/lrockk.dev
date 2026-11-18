import { useState, useEffect } from 'react';
import { supabase, ContactMessage } from '../lib/supabase';
import { X, MessageSquare, Phone, User, Calendar, CheckCircle2, Clock, Trash2, Mail, ExternalLink, Shield } from 'lucide-react';

interface AdminMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string | null;
}

export function AdminMessagesModal({ isOpen, onClose, userEmail }: AdminMessagesModalProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'gmail'>('messages');
  const [gmailRecipient, setGmailRecipient] = useState('lrock.dev5933@gmail.com');
  const [gmailSubject, setGmailSubject] = useState('Project Inquiry from LRock.dev Client');
  const [gmailBody, setGmailBody] = useState('Hello LRock,\n\nI would like to discuss a new project with you.\n\nBest regards,');
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load contact messages from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleSendGmailSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${gmailRecipient}?subject=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;
    window.location.href = mailtoUrl;
    setEmailSentSuccess(true);
    setTimeout(() => setEmailSentSuccess(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-md p-4">
      <div className="bg-[#1E293B] border border-[#14B8A6]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/60 flex items-center justify-between bg-[#0A192F]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 flex items-center justify-center text-[#14B8A6]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Client Inquiries & Gmail Hub</h3>
              <p className="text-xs text-slate-300">Logged in as: <span className="text-[#14B8A6] font-medium">{userEmail || 'Guest'}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700/60 bg-[#0A192F]/50 px-6">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'messages'
                ? 'border-[#14B8A6] text-[#14B8A6]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Supabase Contact Messages ({messages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('gmail')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'gmail'
                ? 'border-[#14B8A6] text-[#14B8A6]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Gmail Integration (lrock5934@gmail.com)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#1E293B]">
          {activeTab === 'messages' ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs text-slate-300">
                  Real-time database table <code className="bg-[#0A192F] px-1.5 py-0.5 rounded text-[#14B8A6]">contact_messages</code> hosted on Supabase.
                </p>
                <button
                  onClick={fetchMessages}
                  className="px-3 py-1.5 bg-[#0A192F] hover:bg-slate-800 text-xs font-semibold rounded-lg border border-slate-700 transition"
                >
                  Refresh Data
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="py-12 text-center text-slate-400 text-sm">Loading messages from Supabase...</div>
              ) : messages.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm bg-[#0A192F]/40 rounded-2xl border border-slate-800">
                  No contact messages found in database yet. Submit a message in the Contact section below!
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-[#0A192F] border border-slate-700/80 rounded-xl p-4 shadow-md">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/20 flex items-center justify-center text-[#14B8A6] font-bold text-sm">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{msg.name}</h4>
                            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                              <Phone className="w-3 h-3 text-[#14B8A6]" />
                              <a href={`tel:${msg.phone_whatsapp}`} className="hover:underline text-slate-300">
                                {msg.phone_whatsapp}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            msg.status === 'closed'
                              ? 'bg-slate-700 text-slate-300'
                              : msg.status === 'contacted'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30'
                          }`}>
                            {msg.status || 'new'}
                          </span>
                          <select
                            value={msg.status || 'new'}
                            onChange={(e) => updateStatus(msg.id!, e.target.value as any)}
                            className="bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      </div>

                      <p className="text-slate-200 text-sm bg-[#1E293B]/70 p-3 rounded-lg border border-slate-800 mb-2">
                        {msg.message}
                      </p>

                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>Submitted: {msg.created_at ? new Date(msg.created_at).toLocaleString() : 'Just now'}</span>
                        <a
                          href={`https://wa.me/${msg.phone_whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(msg.name)},%20regarding%20your%20inquiry%20to%20LRock.dev:`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#14B8A6] hover:underline flex items-center space-x-1 font-medium"
                        >
                          <span>Open WhatsApp Chat</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#0A192F] p-5 rounded-2xl border border-slate-700/80 mb-6">
                <h4 className="font-bold text-white text-base mb-1">Google Workspace Gmail Integration</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Send project briefs or communicate directly with <span className="text-[#14B8A6] font-medium">lrock5934@gmail.com</span> using your default email client or connected Google Workspace account.
                </p>
              </div>

              {emailSentSuccess && (
                <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Email client opened successfully with pre-filled message for lrock5934@gmail.com!</span>
                </div>
              )}

              <form onSubmit={handleSendGmailSimulation} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Recipient Gmail
                  </label>
                  <input
                    type="email"
                    value={gmailRecipient}
                    onChange={(e) => setGmailRecipient(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0A192F] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={gmailSubject}
                    onChange={(e) => setGmailSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0A192F] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Message Body
                  </label>
                  <textarea
                    rows={5}
                    value={gmailBody}
                    onChange={(e) => setGmailBody(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0A192F] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0A192F] font-bold rounded-xl transition shadow-lg flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Gmail App / Mailto</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
