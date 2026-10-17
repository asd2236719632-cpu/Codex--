'use client';

import React from 'react';
import {
  MapPin,
  Sparkles,
  ZoomIn,
  Navigation,
  Copy,
  Maximize2,
  Train,
  Car,
  Truck,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function LocationSection() {
  const { openMapModal, showToast } = useModal();
  const address = '上海市宜川路街道贾运620号';

  const handleCopyAddress = () => {
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

  const handleOpenNavApp = () => {
    const encoded = encodeURIComponent(address);
    window.open('https://uri.amap.com/search?keyword=' + encoded, '_blank');
    showToast('正在为您打开高德地图搜索导航...');
  };

  return (
    <section
      id="location"
      className="scroll-mt-24 py-20 lg:py-24 bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 border-t border-amber-200/50 relative overflow-hidden"
    >
      {/* 背景可爱装饰气泡 */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 区域标题 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-brand-700 text-xs font-bold tracking-wide uppercase shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            <span>STORE LOCATION & PET MAP · 门店位置</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 mt-4 tracking-tight">
            欢迎光临萌爪星空 · 探店与交通路线
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
            我们的门店位于<strong>{address}</strong>。特别绘制可爱清新的治愈系宠物店探店地图，为您与毛孩子开启无忧顺畅的到店之旅。
          </p>
        </div>

        {/* 地图与门店信息双栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 左侧：AI手绘可爱清新宠物店风格地图展示卡片 */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-3 sm:p-5 border-2 border-amber-200/80 shadow-soft hover:shadow-hover transition-all duration-300 group relative overflow-hidden">
              {/* 地图顶部标签栏 */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-stone-100 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                  <span className="font-bold text-stone-800">萌爪星空 · 可爱手绘探店地图</span>
                </div>
                <span className="text-[11px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>可爱清新风 · 专属标注</span>
                </span>
              </div>

              {/* 地图图片容器 */}
              <div
                onClick={openMapModal}
                className="relative mt-3 rounded-2xl overflow-hidden bg-amber-50/50 cursor-pointer shadow-inner"
              >
                <img
                  src="/images/pet-store-map.png"
                  alt="萌爪星空宠物店位置地图 - 上海市宜川路街道贾运620号"
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* 悬浮点击放大遮罩提示 */}
                <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-white/95 text-stone-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-4 h-4 text-brand-600" />
                    <span>点击查看高清地图</span>
                  </span>
                </div>
              </div>

              {/* 地图底部便利操作栏 */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs px-2">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-brand-500" />
                  <span>
                    定位点：<strong className="text-stone-800">{address}</strong>
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制地址</span>
                  </button>
                  <button
                    onClick={openMapModal}
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors flex items-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>大图预览</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：详细到店路线、泊车指引与营业指南 */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-soft space-y-5">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full">
                  TRAFFIC & PARKING GUIDE
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-2">
                  多种便捷方式抵达门店
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  门店位于宜川核心片区，周边林荫葱郁，停车与漫步极方便
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-stone-600">
                {/* 方案 1: 地铁与步行 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50/80 border border-stone-100">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Train className="w-4 h-4" />
                  </div>
                  <div className="leading-relaxed">
                    <strong className="text-stone-900 block mb-0.5">
                      地铁出行 · 步行或轻骑
                    </strong>
                    <span>
                      轨交3/4号线中潭路站、7号线新村路站出站，骑行约5分钟即达，沿途绿树成荫，适合推宠物车或散步到店。
                    </span>
                  </div>
                </div>

                {/* 方案 2: 自驾前往 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50/80 border border-stone-100">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="leading-relaxed">
                    <strong className="text-stone-900 block mb-0.5">
                      自驾车前往 · 专属VIP临停车位
                    </strong>
                    <span>
                      直接搜索导航「{address}」，门店门口配有专属安心停车位，美容师可协助抱宠。
                    </span>
                  </div>
                </div>

                {/* 方案 3: 恒温专车上门 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="leading-relaxed">
                    <strong className="text-amber-900 block mb-0.5">
                      全城改装恒温专车 · 上门安全接送
                    </strong>
                    <span>
                      周边5公里以内配备专车接送服务，车内独立航空箱+24℃恒温空气过滤消杀，免除奔波折腾。
                    </span>
                  </div>
                </div>
              </div>

              {/* 营业时间与咨询 */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    营业时间：<strong>09:30 - 21:00</strong>（全预约制）
                  </span>
                </span>
                <a
                  href="tel:4008889988"
                  className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>400-888-9988</span>
                </a>
              </div>

              {/* 高德地图直接跳转按钮 */}
              <button
                onClick={handleOpenNavApp}
                type="button"
                className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>在高德地图中打开导航路线</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
