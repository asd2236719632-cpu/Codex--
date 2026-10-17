'use client';

import React, { useState } from 'react';
import { Wind, VolumeX, Sparkles, CupSoda, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function EnvironmentGallery() {
  const { openContactModal } = useModal();

  const zones = [
    {
      id: 'reception',
      name: '01 温暖接待与问诊区',
      image: '/images/area1-reception.jpg',
      desc: '原木暖色调，低敏香氛弥漫。毛孩子进门先在宽敞防滑地垫上适应嗅闻，缓解出门紧张，提供专属饮水器与有机冻干零食。',
    },
    {
      id: 'spa',
      name: '02 恒温微气泡水疗SPA区',
      image: '/images/area2-spa.jpg',
      desc: '配置日本超微气泡发生浴缸，恒温38.5℃软化水质，水流静音微压，让毛孩子在温水抚触中舒适打瞌睡。',
    },
    {
      id: 'cat-suite',
      name: '03 猫咪专属独立静音套房',
      image: '/images/area3-cat-suite.jpg',
      desc: '专为高敏猫咪打造，严格气味物理隔离，防犬吠干扰。柔和暖光无阴影，全天候扩散费洛蒙舒缓喷雾。',
    },
    {
      id: 'styling',
      name: '04 全透明日韩精剪造型沙龙',
      image: '/images/area4-styling-studio.jpg',
      desc: '超大落地防爆玻璃窗，全店采光充盈通透。升降液压防滑美容台、德国静音剪刀消毒柜，全程家长透明可视。',
    },
    {
      id: 'vip-lounge',
      name: '05 家长VIP咖啡与直播观礼区',
      image: '/images/area5-vip-lounge.jpg',
      desc: '配备现磨特调咖啡机、舒适沙发座、高速Wi-Fi与多机位4K大屏直播，悠闲品咖啡的同时近距离注视爱宠变美。',
    },
  ];

  const [activeZone, setActiveZone] = useState(zones[0]);

  return (
    <section id="environment" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 左侧说明与4大设施亮点 */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              SMART & STERILE FACILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              不惜成本打造的<br />
              <span className="text-amber-400">医护级净洁空间</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              我们深知环境对毛孩子情绪与健康的致命影响。店面配备恒温双向新风系统、日本超微气泡水处理设备、专业抗噪吹吸风一体机，让每一秒都沐浴在安全与舒适中。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <Wind className="w-5 h-5" />
                  <h4 className="text-white font-bold text-sm">24h负压新风除味</h4>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  全店每小时换气12次，进门闻不到一丝动物异味，保持森林般清新空气。
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <VolumeX className="w-5 h-5" />
                  <h4 className="text-white font-bold text-sm">变频静音降噪吹风</h4>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  运行噪音低于52分贝，远离刺耳尖啸，大幅降低幼犬与猫咪的心跳加速。
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="text-white font-bold text-sm">医用双门紫外灭菌柜</h4>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  一梳一消，毛巾使用75℃高温蒸汽清洗烘干，独立塑封杜绝任何真菌螨虫。
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <CupSoda className="w-5 h-5" />
                  <h4 className="text-white font-bold text-sm">家长休息特调饮品吧</h4>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  透明玻璃吧台提供现磨特调咖啡与免费茶点，实时大屏幕无死角直播洗护。
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={openContactModal}
                type="button"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
              >
                <span>预约到店参观全透明操作间</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 右侧：5大实景分区智能画廊 */}
          <div className="lg:col-span-6 space-y-4">
            {/* 分区切换标签 */}
            <div className="flex flex-wrap gap-2 pb-1">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeZone.id === zone.id
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-white/10 text-stone-300 hover:bg-white/20'
                  }`}
                >
                  {zone.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* 实景大图与介绍 */}
            <div className="bg-stone-800/80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                <img
                  src={activeZone.image}
                  alt={activeZone.name}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-amber-400/90 text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                    STORE SCENE 4K
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{activeZone.name}</h3>
                </div>
              </div>
              <div className="p-5 text-xs text-stone-300 leading-relaxed bg-white/5 border-t border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{activeZone.desc}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
