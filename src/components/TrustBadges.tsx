'use client';

import React from 'react';
import { SprayCan, HeartHandshake, Video, Sparkles, ChevronRight } from 'lucide-react';

export default function TrustBadges() {
  const standards = [
    {
      icon: SprayCan,
      title: '一客一消 · 严防交叉',
      desc: '台面每客紫外+臭氧双重消杀，剪刀排梳单独密封消毒包拆封，一次性加厚亲肤毛巾绝不混用。',
      tag: '医疗级卫生规范',
    },
    {
      icon: HeartHandshake,
      title: '低应激抚慰洗护',
      desc: '进门先适应嗅闻、不强制束缚、零体罚柔声引导。让洗护像做游戏，胆小敏感毛孩也能卸下心防。',
      tag: '爱与尊重先行',
    },
    {
      icon: Video,
      title: '全透明无死角可视',
      desc: '大尺寸落地隔音玻璃，家长休息区一目了然；更支持手机端专属实时高清看护，看得见才最安心。',
      tag: '100%安心底气',
    },
    {
      icon: Sparkles,
      title: '纯天然奢华SPA级洗护',
      desc: '严选日本/意大利原装进口草本精油香波，无硅油无防腐剂，微气泡深层去油滋养，敏感肌首选。',
      tag: '皮毛健康屏障',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
            SAFETY & LOVE FIRST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            为什么挑剔的铲屎官都认准萌爪星空？
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-3">
            我们像对待自己的孩子一样尊重每一只生命，把安全、卫生、舒适做到极致细节。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50/80 rounded-2xl p-7 border border-stone-200/60 hover:bg-white hover:border-amber-300 hover:shadow-soft transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 text-xs font-semibold text-amber-600 flex items-center gap-1">
                  <span>{item.tag}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
