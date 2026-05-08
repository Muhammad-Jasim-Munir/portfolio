'use client';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full" style={{ background: 'transparent' }}>
      <div className="h-full transition-[width] duration-75" style={{ width: `${p}%`, background: 'var(--accent)' }} />
    </div>
  );
}
