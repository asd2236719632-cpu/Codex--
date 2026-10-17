'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ArrowUpRight } from 'lucide-react';

export interface StoreArea {
  id: string;
  name: string;
  shortName: string;
  subTitle: string;
  tag: string;
  image: string;
  color: string;
}

export const STORE_AREAS: StoreArea[] = [
  {
    id: 'reception',
    name: '01 温暖接待与问诊区',
    shortName: '迎宾接待',
    subTitle: '极简罗马洞石 · 原木暖光 · 进门适应嗅闻减敏',
    tag: '迎宾问诊',
    image: '/images/area1-reception.jpg',
    color: '#F59E0B',
  },
  {
    id: 'spa',
    name: '02 恒温微气泡水疗SPA区',
    shortName: '气泡水疗',
    subTitle: '超微气泡亚克力缸 · 38.5℃恒温 · 静音舒缓减压',
    tag: '碳酸SPA',
    image: '/images/area2-spa.jpg',
    color: '#0D9488',
  },
  {
    id: 'cat-suite',
    name: '03 猫咪专属独立静音套房',
    shortName: '猫咪套房',
    subTitle: '独立静音羊毛舱 · 物理气味隔离 · 零犬吠惊扰',
    tag: '零应激猫舍',
    image: '/images/area3-cat-suite.jpg',
    color: '#8B5CF6',
  },
  {
    id: 'styling',
    name: '04 全透明日韩精剪造型沙龙',
    shortName: '精剪沙龙',
    subTitle: '超大落地全景窗 · 赛级升降台 · 无影护眼环形光',
    tag: '赛级造型',
    image: '/images/area4-styling-studio.jpg',
    color: '#D97706',
  },
  {
    id: 'vip-lounge',
    name: '05 家长VIP咖啡与直播观礼区',
    shortName: 'VIP休憩吧',
    subTitle: '羊羔绒轻奢沙发 · 现磨特调 · 4K实时看护直播',
    tag: '全景透明',
    image: '/images/area5-vip-lounge.jpg',
    color: '#EC4899',
  },
];

const ROTATION_INTERVAL_MS = 5000;
const TICK_STEP_MS = 50;

export default function StoreWheelBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [scrollRatio, setScrollRatio] = useState(0); // 0 (hero) to 1 (scrolled down)

  const elapsedRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);
  const lastTimeRef = useRef(Date.now());

  isPlayingRef.current = isPlaying;

  // 监听页面滚动，计算首屏全景到下层护眼底色的过渡比率
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ratio = Math.min(1, Math.max(0, scrollY / 420));
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 轮盘 5 秒自动流转倒计时 - 使用时间戳差值，绝不因鼠标悬停而锁死
  useEffect(() => {
    lastTimeRef.current = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (isPlayingRef.current) {
        elapsedRef.current += delta;
        const currentProgress = Math.min(1, elapsedRef.current / ROTATION_INTERVAL_MS);
        setProgress(currentProgress);

        if (elapsedRef.current >= ROTATION_INTERVAL_MS) {
          elapsedRef.current = 0;
          setProgress(0);
          setCurrentIndex((prev) => (prev + 1) % STORE_AREAS.length);
        }
      }
    }, TICK_STEP_MS);

    return () => clearInterval(timer);
  }, []);

  const handleSelectArea = useCallback((index: number) => {
    elapsedRef.current = 0;
    lastTimeRef.current = Date.now();
    setProgress(0);
    setCurrentIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        lastTimeRef.current = Date.now();
      }
      return next;
    });
  }, []);

  const currentArea = STORE_AREAS[currentIndex];

  // SVG 环形进度参数计算 (画布 160 x 160，圆心 80, 80，半径 64)
  const svgRadius = 64;
  const circumference = 2 * Math.PI * svgRadius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <>
      {/* 1. 全屏 4K 门店实景背景层 */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* 5 张大图交叉淡入淡出与微慢速缓动 (Ken Burns 效果) */}
        {STORE_AREAS.map((area, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={area.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={area.image}
                alt={area.name}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* 首屏轻奢高透微光遮罩：提亮文字阅读舒适度，同时保留 4K 空间层次 */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/30 to-stone-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/60" />

        {/* 顶部微磨砂高光与暖光泛光 */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-stone-950/70 to-transparent" />

        {/* 首屏分段风关键遮罩：离开首屏后自动平滑过渡为 bg-warm-bg/95 护眼底色 */}
        <div
          className="absolute inset-0 bg-[#FAF7F2] transition-opacity duration-500 ease-out"
          style={{ opacity: scrollRatio * 0.96 }}
        />
      </div>

      {/* 2. 右下角悬浮环形仪表轮盘控制器 (避开返回顶部按钮 z-30) */}
      <aside
        className="fixed bottom-24 sm:bottom-28 right-3 sm:right-6 z-30 pointer-events-auto scale-80 sm:scale-100 origin-bottom-right transition-transform"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="店内环境全景轮盘控制器"
      >
        <div className="relative flex flex-col items-end gap-2">
          
          {/* 当前区域微型信息悬浮胶囊 */}
          <div className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-xl border border-white/20 text-white shadow-xl transition-all duration-300 hover:bg-stone-900">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: currentArea.color }}
            />
            <a
              href="#environment"
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-tight hover:text-amber-400 transition-colors"
              title="点击查看实景设施与介绍"
            >
              <span>{currentArea.shortName}</span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="text-amber-300/90 text-[10px] hidden sm:inline">{currentArea.tag}</span>
              <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* 环形仪表轮盘本体 */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-stone-950/85 backdrop-blur-2xl border border-white/20 shadow-2xl p-1.5 flex items-center justify-center select-none group">
            
            {/* SVG 进度圆环与刻度导轨 */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none"
              viewBox="0 0 160 160"
            >
              <defs>
                <linearGradient id="wheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              {/* 背景底轨圆环 */}
              <circle
                cx="80"
                cy="80"
                r={svgRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="3.5"
              />

              {/* 5 秒平滑倒计时进度环 */}
              <circle
                cx="80"
                cy="80"
                r={svgRadius}
                fill="none"
                stroke="url(#wheel-gradient)"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-75 ease-linear"
              />
            </svg>

            {/* 5 区分段点击刻度点 (围绕圆周均匀分布) */}
            {STORE_AREAS.map((area, i) => {
              const angleDeg = -90 + i * (360 / STORE_AREAS.length);
              const angleRad = (angleDeg * Math.PI) / 180;
              const leftPercent = 50 + (svgRadius / 80) * 50 * Math.cos(angleRad);
              const topPercent = 50 + (svgRadius / 80) * 50 * Math.sin(angleRad);
              const isSelected = i === currentIndex;

              return (
                <button
                  key={area.id}
                  onClick={() => handleSelectArea(i)}
                  type="button"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 z-10 flex items-center justify-center ${
                    isSelected
                      ? 'w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-tr from-amber-500 to-orange-400 text-stone-950 font-black text-[10px] sm:text-xs shadow-glow ring-2 ring-white scale-110'
                      : 'w-4 h-4 sm:w-5 sm:h-5 bg-stone-800/90 text-white/70 hover:bg-white hover:text-stone-950 hover:scale-125 border border-white/30 text-[9px]'
                  }`}
                  title={`${area.name} (点击切换)`}
                  aria-label={`切换到 ${area.name}`}
                >
                  {i + 1}
                </button>
              );
            })}

            {/* 中心播放/暂停控制按钮 */}
            <button
              onClick={togglePlay}
              type="button"
              className="relative z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-stone-900 to-stone-950 hover:from-amber-600 hover:to-orange-600 text-white border border-white/20 shadow-lg flex flex-col items-center justify-center gap-0.5 transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
              title={isPlaying ? '点击暂停自动轮转' : '点击继续自动轮转'}
              aria-label={isPlaying ? '暂停轮换' : '播放轮换'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover/btn:text-white transition-colors" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover/btn:text-white transition-colors ml-0.5" />
              )}
              <span className="text-[9px] font-bold text-white/70 group-hover/btn:text-white">
                {isPlaying ? 'AUTO' : 'PAUSE'}
              </span>
            </button>

            {/* 悬停微型提示 */}
            <div className="absolute -bottom-7 right-0 text-[10px] text-stone-400 bg-stone-900/90 px-2 py-0.5 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {isPlaying ? '5秒自动流转 · 点击中心暂停' : '已暂停 · 点击中心播放'}
            </div>

          </div>

        </div>
      </aside>
    </>
  );
}
