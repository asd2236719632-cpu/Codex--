'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '@/types';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: '幼宠或胆小敏感的猫咪，第一次来店洗澡会应激吗？',
      answer:
        '绝不会强制下水！针对初次到店或胆小猫犬，我们会先安排15-30分钟的「嗅闻脱敏期」，在安静独立的舒缓舱里适应环境与美容师的气味。我们绝不使用麻醉或粗暴束缚，如发现明显惊恐会立即暂停安抚，甚至建议延后分步洗护。',
    },
    {
      question: '全程全透明洗护，家长可以在现场看或者远程看吗？',
      answer:
        '当然可以！这是我们的立店之本。现场配备大面积落地玻璃观礼区和家长咖啡吧，您能一边喝现磨咖啡一边看完全程。若您需要外出办事，我们的微信小程序支持实时云看护，美容师洗护前后还会给您发送高清实况小视频。',
    },
    {
      question: '门店使用的洗护香波安全吗？如果有皮肤病可以洗吗？',
      answer:
        '我们全线选用日本与意大利进口天然植物草本香波，无硅油、无有害防腐剂，达到真正的人用级与无泪配方标准。若爱宠近期有皮肤泛红、真菌皮屑，可由我们的芳疗师定制搭配专属草本微晶抑菌药浴，温和调理。',
    },
    {
      question: '专车接送服务是怎么操作的？车内环境安全吗？',
      answer:
        '我们提供周边5公里内的专车接送服务。专车为专业改装恒温空调车，车内备有一宠一消毒的专用舒适航空箱与安全固定装置，绝不混装混运，确保路途中安静避震、无颠簸应激。',
    },
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
          FAQ & TRANSPARENCY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
          新手家长关心的常见疑问
        </h2>
        <p className="text-stone-500 text-sm sm:text-base mt-2">
          有问必答，毫无遮掩。让您在把毛孩子交托给我们之前，放下所有顾虑。
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleIndex(idx)}
                type="button"
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-stone-900 flex justify-between items-center hover:bg-stone-50/50 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ml-3 ${
                    isOpen ? 'rotate-180 text-brand-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
