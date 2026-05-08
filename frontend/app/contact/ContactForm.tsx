'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending'); setError('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error'); setError('Please fill in name, email and message.'); return;
    }
    if (form.message.length > 2000) { setStatus('error'); setError('Message too long (max 2000).'); return; }
    try {
      await api.sendMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="brut-card p-6 space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest">Name</label>
        <input name="name" value={form.name} onChange={onChange} required maxLength={100}
          className="mt-1 w-full brut-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest">Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} required maxLength={200}
          className="mt-1 w-full brut-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest">Subject</label>
        <input name="subject" value={form.subject} onChange={onChange} maxLength={200}
          className="mt-1 w-full brut-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest">Message</label>
        <textarea name="message" value={form.message} onChange={onChange} required rows={5} maxLength={2000}
          className="mt-1 w-full brut-border bg-transparent px-3 py-2" />
      </div>

      <button type="submit" disabled={status === 'sending'} className="brut-btn">
        {status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>

      {status === 'sent' && (
        <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>✓ Message sent. I&apos;ll reply soon.</p>
      )}
      {status === 'error' && (
        <p className="text-sm font-bold" style={{ color: 'var(--accent-2)' }}>✕ {error || 'Something went wrong.'}</p>
      )}
    </form>
  );
}
