'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white/95 text-stone-700 shadow-lg hover:bg-stone-100 flex items-center justify-center transition-all border border-stone-200/80 hover:scale-105 active:scale-95"
      title="回到顶部"
      aria-label="回到顶部"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
