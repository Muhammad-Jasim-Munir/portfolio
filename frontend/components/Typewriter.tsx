'use client';
import { useEffect, useState } from 'react';

const phrases = [
  'Building backend systems.',
  'Designing data structures.',
  'Shipping full-stack apps.',
  'Learning the MERN stack.',
];

export default function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = phrases[i];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1));
        if (text.length + 1 === cur.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % phrases.length); }
      }
    }, del ? 30 : 60);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return <span className="cursor">{text}</span>;
}
