'use client';

import React from 'react';
import { CalendarHeart, Phone } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function CtaBanner() {
  const { openBookingModal, openContactModal } = useModal();

  return (
    <section className="py-16 bg-gradient-to-r from-brand-600 via-amber-500 to-orange-500 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          让毛孩子从今天起，享受被尊重的洗护时光
        </h2>
        <p className="text-amber-100 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          首次线上预约立减 ¥20 · 赠送专属洗护前后对比高清九宫格返图 · 全程透明可视
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openBookingModal()}
            type="button"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-extrabold text-base shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CalendarHeart className="w-5 h-5 text-brand-600" />
            <span>一键在线预约档期</span>
          </button>
          <button
            onClick={openContactModal}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/20 hover:bg-black/30 text-white border border-white/30 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            <span>咨询当班店长</span>
          </button>
        </div>
      </div>
    </section>
  );
}
