'use client';

import React from 'react';
import { Award, Sparkles, ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function TeamSection() {
  const { openBookingModal } = useModal();

  const team = [
    {
      name: '林晨 (Master Chen)',
      role: '主理人 / 国家CKU认证A级美容师',
      badge: '9年从业经验',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      intro: '曾赴日深造萌系宠物修毛美学，主理完成超 8,000 例犬只精细剪形。对骨骼体态有极强把控力，擅长比熊、泰迪圆脸与体型修饰。',
      tags: ['全国美容大赛金奖', '日韩萌系美学导师', '低应激洗护主讲'],
    },
    {
      name: '周野 (Yoko Zhou)',
      role: '高级猫咪专属洗护导师',
      badge: 'ISFM猫科友好认证',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      intro: '专注于猫咪行为学与低应激抚慰洗护。深谙猫咪细微肢体语言，专治布偶、缅因顽固油尾巴，创造0抓伤、0惊恐的温和洗护奇迹。',
      tags: ['零应激猫咪抚慰', '长毛猫洗护专家', '宠物心理行为学认证'],
    },
    {
      name: '王子默 (Mark Wang)',
      role: '宠物芳疗理疗师 / 营养护理顾问',
      badge: '6年临床洗护经验',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      intro: '精研天然植物精油与微气泡碳酸泉水疗，擅长针对红斑皮屑、季节性脱毛、过敏肌提供精准调理方案，让皮毛重获新生。',
      tags: ['皮毛健康管理师', '微气泡水疗先锋', '天然草本精油调配'],
    },
  ];

  return (
    <section id="team" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
          MASTER GROOMERS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
          国家认证资深主理人团队
        </h2>
        <p className="text-stone-500 text-sm sm:text-base mt-2">
          平均行业经验 7 年以上。持证上岗，不仅精通刀剪技艺，更是懂得倾听动物心声的温柔倾听者。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {member.badge}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-brand-600 text-xs font-bold mb-1">
                  <Award className="w-4 h-4" />
                  <span>{member.role}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{member.name}</h3>
                <p className="text-stone-600 text-xs leading-relaxed mb-4">
                  {member.intro}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                  {member.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => openBookingModal(`指定美容师：${member.name}`)}
                type="button"
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-900 text-stone-800 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>预约 TA 为爱宠主理</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
