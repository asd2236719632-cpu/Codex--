'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Scissors, SlidersHorizontal, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="before-after" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
          TRANSFORMATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
          洗护前后惊艳蜕变 · 真实记录
        </h2>
        <p className="text-stone-500 text-sm sm:text-base mt-2">
          拖动中间滑块对比：从“流浪风小炸毛”到“软萌圆滚滚棉花糖”，爱与专业看得见。
        </p>
      </div>

      {/* 互动对比滑块容器 */}
      <div className="max-w-4xl mx-auto bg-white p-3 sm:p-5 rounded-3xl shadow-xl border border-stone-200/80">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => handleMove(e.clientX)}
          className="ba-slider-container relative rounded-2xl h-[360px] sm:h-[480px] cursor-ew-resize select-none overflow-hidden"
        >
          {/* 底图：洗护后 (After) */}
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
            alt="洗护修剪后可爱整洁的狗狗"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>洗护后 · 蓬松软萌</span>
          </div>

          {/* 顶图：洗护前 (Before) */}
          <div
            className="ba-overlay-image absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative h-full w-[800px] sm:w-[896px] max-w-none">
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80"
                alt="洗护前毛发凌乱微脏的小狗"
                className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none"
              />
            </div>
            <div className="absolute top-4 left-4 bg-stone-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5 backdrop-blur-sm">
              <Scissors className="w-3.5 h-3.5" />
              <span>洗护前 · 毛发打结泛油</span>
            </div>
          </div>

          {/* 分割线与拖拽手柄 */}
          <div
            className="ba-handle bg-white shadow-2xl flex items-center justify-center z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-white text-stone-800 shadow-xl border-2 border-brand-500 flex items-center justify-center transform -translate-x-1/2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            </div>
          </div>
        </div>

        {/* 底部指标解读 */}
        <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span>
              <strong>案例宠儿：</strong>比熊「元宝」· 2岁
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span>
              <strong>主治痛点：</strong>耳后成团毛毡 + 泪痕泛红氧化
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              <strong>方案：</strong>碳酸泉药浴 + 日系圆萌头手工精剪
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
