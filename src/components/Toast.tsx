'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function Toast() {
  const { toast } = useModal();

  if (!toast.show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 border border-white/10 transition-all animate-bounce">
      <Info className="w-4 h-4 text-amber-400 shrink-0" />
      <span>{toast.message}</span>
    </div>
  );
}
