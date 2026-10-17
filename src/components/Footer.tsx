'use client';

import React from 'react';
import Link from 'next/link';
import { PawPrint, MessageCircle, MapPin, Clock, PhoneCall, Truck } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function Footer() {
  const { openContactModal, showToast } = useModal();
  const address = '上海市宜川路街道贾运620号';

  const copyAddress = () => {
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
    <footer className="bg-stone-950 text-stone-400 text-xs sm:text-sm py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* 品牌专栏 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-soft">
                <PawPrint className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">萌爪星空 · Paws & Glow</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              以爱宠身心健康为信仰的现代宠物美学生活馆。全透明洗护、纯天然低敏洗浴、猫咪零应激空间，致力于重新定义中国宠物洗护体验。
            </p>
            <div className="flex items-center gap-4 pt-2 text-stone-300">
              <button
                onClick={openContactModal}
                type="button"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors"
                title="微信客服"
                aria-label="微信客服"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 快捷导航 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">快捷导航</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  洗护套餐矩阵
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  智能费用估算器
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-amber-400 transition-colors">
                  洗护前后蜕变
                </a>
              </li>
              <li>
                <a href="#environment" className="hover:text-amber-400 transition-colors">
                  无菌透明空间
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-amber-400 transition-colors">
                  A级美容师团队
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  常见问题解答
                </a>
              </li>
            </ul>
          </div>

          {/* 明星项目 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">明星项目</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  猫咪零应激抚慰洗护
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  日韩风萌系精细修剪
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  日本碳酸泉微气泡SPA
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  大型犬畅爽脱脂洗护
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  长毛猫去油爆毛高光护理
                </a>
              </li>
            </ul>
          </div>

          {/* 门店指南 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">到店指南</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span onClick={copyAddress} className="cursor-pointer hover:text-amber-300">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>09:30 - 21:00 (全预约制)</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:4008889988" className="hover:text-amber-400 font-bold">
                  400-888-9988
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>全城恒温接送车预约</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-xs text-center md:text-left">
          <div>
            <p>© 2026 萌爪星空 · Paws & Glow 宠物生活馆 版权所有</p>
            <p className="mt-1">
              沪ICP备2026088899号-1 · 动物洗护卫生示范单位 · 绿色环保认证门店
            </p>
          </div>
          <p className="text-stone-600 text-[11px]">
            门店洗护全部采用一客一消，为了保障您与毛孩子的最佳体验，建议提前在线预约
          </p>
        </div>
      </div>
    </footer>
  );
}
