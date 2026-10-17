'use client';

import React from 'react';
import { X, MessageSquare, QrCode, Phone } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function ContactModal() {
  const { contactModalOpen, closeContactModal, showToast } = useModal();

  if (!contactModalOpen) return null;

  const copyWechat = () => {
    const wechat = 'PawsGlow_VIP';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(wechat).then(() => {
        showToast('已成功复制店长微信号：' + wechat);
      }).catch(() => {
        showToast('微信号：' + wechat + ' (可手动添加)');
      });
    } else {
      showToast('微信号：' + wechat + ' (可手动添加)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative border border-stone-100">
        <button
          onClick={closeContactModal}
          type="button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
          aria-label="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-stone-900">添加专属宠物洗护顾问</h3>
        <p className="text-xs text-stone-500 mt-1 mb-4">
          一对一解答宠物洗护疑问、发视频看店、接送车调度
        </p>

        {/* 微信二维码区域 */}
        <div className="w-44 h-44 mx-auto bg-stone-50 p-3 rounded-2xl border border-stone-200 flex items-center justify-center shadow-inner mb-4">
          <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center p-2 text-stone-800">
            <QrCode className="w-20 h-20 text-stone-800 mb-1" />
            <span className="text-[11px] font-bold text-stone-600">微信扫码添加店长</span>
          </div>
        </div>

        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex items-center justify-between text-xs mb-4">
          <span className="text-stone-500 font-mono">
            微信号: <strong className="text-stone-900 font-bold">PawsGlow_VIP</strong>
          </span>
          <button
            onClick={copyWechat}
            type="button"
            className="text-brand-600 hover:text-brand-700 font-bold px-2 py-1 rounded bg-amber-100/80 transition-colors"
          >
            复制
          </button>
        </div>

        <a
          href="tel:4008889988"
          className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>直接拨打客服电话 400-888-9988</span>
        </a>
      </div>
    </div>
  );
}
