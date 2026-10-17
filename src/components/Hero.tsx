'use client';

import React from 'react';
import { Sparkles, CalendarHeart, ShieldCheck, Eye, Droplets, Heart, Sparkle, ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import BookingDateWidget from '@/components/BookingDateWidget';

export default function Hero() {
  const { openBookingModal } = useModal();

  return (
    <section className="relative pt-6 pb-16 lg:pt-14 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* 左侧文案与行动导向：与 4K 空间实景深度透叠，精细文字投影与微磨砂底衬 */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* 新客特惠标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-950/60 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold shadow-xl">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>新客尊享礼：首次线上预约立减 ¥20 + 赠送毛发深层滋润SPA</span>
            </div>

            {/* 大标题 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              让每次洗护，都是爱宠的<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                沉浸式度假 SPA
              </span>
            </h1>

            {/* 描述段落 */}
            <p className="text-base sm:text-lg text-stone-100 max-w-2xl leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              告别粗暴关笼与惊恐尖叫。国家A级资深美容师主理，纯植物精油低敏配方，全透明医护级洗护空间，实时云端可视化直播，为TA打造安全、温柔、被尊重的美好时刻。
            </p>

            {/* 按钮群组 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => openBookingModal()}
                type="button"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-brand-600 text-white font-extrabold text-base shadow-glow hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <CalendarHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>立即预约星级洗护</span>
              </button>

              <a
                href="#environment"
                className="px-7 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-base border border-white/30 backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>全透明环境参观</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 3大特色微标签 (带微磨砂底衬与通透感) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-stone-100 font-medium max-w-[calc(100%-60px)] sm:max-w-none">
              <div className="flex items-center gap-2 bg-stone-950/50 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-2xl shadow-lg">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>低应激情绪抚慰洗护</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-950/50 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-2xl shadow-lg">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <span>全流程无死角透明可视</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-950/50 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-2xl shadow-lg">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <span>天然植物精油无泪配方</span>
              </div>
            </div>

          </div>

          {/* 右侧展示卡片与预约小窗口 */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* 主图卡片（可爱宠物泡泡浴实拍） */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-stone-900 aspect-[4/3] sm:aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80"
                  alt="宠物正在享受温暖的泡泡浴洗护"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                      LIVE 实拍
                    </span>
                    <p className="font-bold text-sm sm:text-base mt-1">比熊「球球」的碳酸泉水疗时刻</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-xl">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>享受中</span>
                  </div>
                </div>
              </div>

              {/* 浮动小卡片1：今日特惠通知 */}
              <div className="absolute -top-6 -left-6 sm:-left-8 bg-stone-900/85 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 animate-pulse-subtle text-white z-20">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">今日特惠已就绪</p>
                  <p className="text-[11px] text-stone-300">赠送毛发修形与爪爪养护</p>
                </div>
              </div>

              {/* 浮动小卡片2：猫咪专区认证（右上方微调，避免遮挡下方预约窗口） */}
              <div className="absolute top-1/4 -right-4 sm:-right-6 bg-stone-900/85 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-white/20 max-w-[200px] text-white z-20 hidden sm:block">
                <div className="flex items-center gap-2 text-white mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold">独立猫咪静音洗护</span>
                </div>
                <p className="text-[10px] text-stone-300 leading-tight">
                  气味隔离 · 柔和弱光 · 零犬吠惊扰
                </p>
              </div>

              {/* 新增：预约到店日期功能小窗口 */}
              <BookingDateWidget />

            </div>
          </div>

        </div>

        {/* 底部数据荣誉条：深色微磨砂底衬，与全屏 4K 景深浑然天成 */}
        <div className="mt-16 sm:mt-24 p-6 sm:p-8 rounded-3xl bg-stone-950/60 backdrop-blur-xl border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-2xl">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">4.9+</div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">大众点评/美团 真实五星好评</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">10,000+</div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">毛孩子享受过星空洗护</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">100%</div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">全透明玻璃房，洗浴全程可视</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">0 暴力</div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">零麻醉、拒绝粗暴关笼束缚</p>
          </div>
        </div>

      </div>
    </section>
  );
}
