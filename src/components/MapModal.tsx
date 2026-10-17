'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Copy } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function MapModal() {
  const { mapModalOpen, closeMapModal, showToast } = useModal();

  if (!mapModalOpen) return null;

  const copyAddress = () => {
    const address = '上海市宜川路街道贾运620号';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => {
        showToast('📍 已复制门店地址：' + address);
      }).catch(() => {
        showToast('📍 门店地址：' + address);
      });
    } else {
      showToast('📍 门店地址：' + address);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative border border-stone-100 overflow-hidden">
        <button
          onClick={closeMapModal}
          type="button"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors z-10"
          aria-label="关闭地图"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-3 px-2">
          <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-500" />
            <span>萌爪星空宠物店位置地图（上海市宜川路街道贾运620号）</span>
          </h3>
        </div>

        <div className="rounded-2xl overflow-hidden border border-stone-200 bg-amber-50/30 flex justify-center items-center">
          <img
            src="/images/pet-store-map.png"
            alt="萌爪星空宠物店地图高清原图"
            className="w-full h-auto max-h-[75vh] object-contain mx-auto"
          />
        </div>

        <div className="mt-4 px-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-500">
            门店地址：<strong className="text-stone-800">上海市宜川路街道贾运620号</strong>
            （按图导航，期待与您和毛孩子相见）
          </span>
          <button
            onClick={copyAddress}
            type="button"
            className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>复制完整地址</span>
          </button>
        </div>
      </div>
    </div>
  );
}
