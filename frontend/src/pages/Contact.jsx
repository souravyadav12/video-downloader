import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated submission — replace with real backend/email service
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <Mail size={12} className="text-indigo-400" /> Get in Touch
        </div>
        <h1 className="text-4xl font-black gradient-text mb-3">Contact Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a question, feedback, or a DMCA concern? We'd love to hear from you.
          Fill out the form below or email us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info cards */}
        <div className="space-y-4">
          {[
            {
              icon: <Mail size={20} className="text-indigo-400" />,
              title: 'Email Us',
              body: 'support@vidsnap.app',
              sub: 'We reply within 24–48 hours',
            },
            {
              icon: <MessageSquare size={20} className="text-indigo-400" />,
              title: 'General Inquiries',
              body: 'Questions about how the tool works',
              sub: 'Also covers feature requests',
            },
            {
              icon: <AlertCircle size={20} className="text-amber-400" />,
              title: 'DMCA / Copyright',
              body: 'dmca@vidsnap.app',
              sub: 'Handled within 72 hours',
            },
          ].map(({ icon, title, body, sub }) => (
            <div key={title} className="glass rounded-xl p-5 space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="font-bold text-white text-sm">{title}</span>
              </div>
              <p className="text-gray-300 text-sm font-medium">{body}</p>
              <p className="text-gray-500 text-xs">{sub}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="md:col-span-2 glass rounded-2xl p-6 sm:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-black text-white">Message Sent! 🎉</h3>
              <p className="text-gray-400 text-sm text-center">
                Thanks for reaching out! We'll get back to you within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-bold text-white mb-6">Send us a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/70 focus:bg-white/8 input-glow transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/70 focus:bg-white/8 input-glow transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Subject *
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500/70 transition-all"
                >
                  <option value="">Select a subject…</option>
                  <option value="general">General Question</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="dmca">DMCA / Copyright</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help…"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/70 focus:bg-white/8 input-glow transition-all resize-none"
                />
              </div>
              <button
                id="contact-submit-btn"
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold"
              >
                <Send size={16} /> Send Message
              </button>
              <p className="text-xs text-gray-600 text-center">
                We will never share your email with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
