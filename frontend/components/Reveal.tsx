'use client';
import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 border-b-2 border-current pb-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
        ▶ {kicker}
      </p>
      <h2 className="display mt-2 text-4xl md:text-6xl">{title}</h2>
    </div>
  );
}
