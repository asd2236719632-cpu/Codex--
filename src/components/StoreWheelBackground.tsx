'use client';

import React, { useState, useEffect } from 'react';

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

export default function StoreWheelBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0); // 0 (hero) to 1 (scrolled down)

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

  // 5 秒自动平滑流转轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STORE_AREAS.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
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
  );
}
