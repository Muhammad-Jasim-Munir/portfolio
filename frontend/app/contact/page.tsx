import { SectionHeader } from '@/components/Reveal';
import ContactForm from './ContactForm';

export const metadata = { title: 'Contact', description: 'Get in touch.' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <SectionHeader kicker="say hi" title="Contact" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="brut-card p-6">
          <h3 className="display text-2xl">Direct channels</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✉ <a className="underline" href="mailto:mjmflux@icloud.com">mjmflux@icloud.com</a></li>
            <li>☎ <a className="underline" href="tel:+923285958656">+92 328 5958656</a></li>
            <li>⌘ <a className="underline" href="https://github.com/Muhammad-Jasim-Munir" target="_blank" rel="noreferrer">github.com/Muhammad-Jasim-Munir</a></li>
            <li>♺ <a className="underline" href="http://linkedin.com/in/muhammad-jasim-enflux" target="_blank" rel="noreferrer">linkedin.com/in/muhammad-jasim-enflux</a></li>
          </ul>
          <p className="mt-6 text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Response time · usually under 24h
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
