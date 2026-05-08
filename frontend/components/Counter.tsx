'use client';
import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Counter({ to, label, suffix = '' }: { to: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const dur = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return (
    <motion.div ref={ref} className="brut-card p-6">
      <p className="display text-5xl md:text-6xl">{n}{suffix}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{label}</p>
    </motion.div>
  );
}
