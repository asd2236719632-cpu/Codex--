'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { ServiceCategory, ServiceItem } from '@/types';

export default function Services() {
  const { openBookingModal } = useModal();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: '全部服务' },
    { id: 'dog', label: '狗狗洗护' },
    { id: 'cat', label: '猫咪专属' },
    { id: 'spa', label: '奢宠水疗SPA' },
    { id: 'styling', label: '日韩造型剪形' },
  ];

  const serviceList: ServiceItem[] = [
    {
      id: 'dog-basic',
      category: ['dog'],
      badge: '经典推荐',
      badgeColor: 'bg-amber-500',
      duration: '约 60-90 分钟',
      title: '犬类活力清爽深层洗护',
      price: 88,
      description: '针对日常清洁与毛发去油，适合所有健康犬种，洗完毛质蓬松透气，自带淡淡森林木质香。',
      features: [
        '拔耳毛、耳道温和洗护清洗',
        '修剪指甲、磨圆防抓伤、清脚底毛',
        '肛门腺排空、腹底及卫生区杂毛清理',
        '两遍深层去油清洁 + 一遍顺滑护毛素',
        '低音变频吹水拉毛、手工梳开浮毛',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cat-soothe',
      category: ['cat'],
      badge: '独立猫室',
      badgeColor: 'bg-emerald-500',
      duration: '约 50-70 分钟',
      title: '猫咪零应激极净抚慰洗护',
      price: 98,
      description: '独立猫咪静音房，无犬吠干扰。采用专研无泡弱酸性配方，慢速水流抚触洗浴，极度安抚敏感神经。',
      features: [
        '洗前30分钟费洛蒙情绪舒缓舱适应',
        '修剪指甲指缝死皮、耳道温和深清',
        '日本进口猫咪专用去黑头去油膏局部乳化',
        '恒温微压恒定柔水清洗、弱光安抚吹风箱',
        '眼周泪痕温和滋养清洁',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'styling-pro',
      category: ['dog', 'styling'],
      badge: '名师掌剪',
      badgeColor: 'bg-indigo-500',
      duration: '约 90-150 分钟',
      title: '日韩风萌系精细修剪与造型设计',
      price: 158,
      description: '国家认证A级宠物美容大师1对1量身体态设计，圆头泰迪、萌熊比熊、雪纳瑞考究线条，精致出街吸睛。',
      features: [
        '包含全套高端活力深层精洗护毛',
        '针对骨骼体型手工设计脸部轮廓',
        '进口高端静音手工剪精雕细琢',
        '足部圆润泰迪熊掌造型修剪',
        '赠送专属手作定制丝巾配饰1件',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'spa-bubble',
      category: ['dog', 'cat', 'spa'],
      badge: '深度滋润',
      badgeColor: 'bg-rose-500',
      duration: '约 60-80 分钟',
      title: '日本高浓度碳酸泉微气泡水疗 SPA',
      price: 128,
      description: '微米级超细密集气泡爆破毛囊深层油垢，有效改善敏感泛红、皮屑、干痒，令毛发焕发丝缎般光泽。',
      features: [
        '超微碳酸泉恒温水疗浸泡循环按摩',
        '天然死海矿物泥深层毛囊排毒敷裹',
        '澳洲坚果籽精油滋养角质层',
        '改善异味、预防夏日真菌与潮湿皮炎',
        '洗后毛发蓬松度持久度提升200%',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'large-dog',
      category: ['dog'],
      badge: '大狗福音',
      badgeColor: 'bg-amber-600',
      duration: '约 90-140 分钟',
      title: '巨型/大型犬畅爽脱脂洗护',
      price: 188,
      description: '金毛、萨摩耶、阿拉斯加、边牧、拉布拉多专属超大低阻水力冲淋池，强力脱死浮毛。',
      features: [
        '2名经验美容师双人合力配合洗吹',
        '大功率双电机吹水，彻底吹透根部防湿疹',
        '强力开毛结排浮毛，一趟解决掉毛换季痛点',
        '关节保护型防滑软垫浴缸',
        '吹干后深层骨骼肌肉放松抚摩',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ragdoll-spa',
      category: ['cat', 'spa', 'styling'],
      badge: '长毛猫明星款',
      badgeColor: 'bg-rose-500',
      duration: '约 90-120 分钟',
      title: '长毛猫丝滑去油爆毛SPA',
      price: 218,
      description: '专克布偶、缅因、金渐层大油尾巴与打结！深层植物乳化去油，洗后丝滑如丝绸缎带。',
      features: [
        '进口天然精油局部温敷乳化重油区',
        '丝蛋白深层修复精华素，防止静电炸毛',
        '细密排梳手工逐层开结梳理',
        '围脖修圆、脚掌底毛修平',
        '赠送高纤维排毛滋养零食礼包',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredServices = serviceList.filter(
    (item) => activeCategory === 'all' || item.category.includes(activeCategory as any)
  );

  return (
    <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
            SERVICE MENU
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight">
            专业宠物洗护服务矩阵
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-2">
            标准流程多达12道工序，专宠专洗，呵护从头到爪尖的每一寸毛发。
          </p>
        </div>

        {/* 分类标签过滤器 */}
        <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 服务卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                {service.badge && (
                  <span
                    className={`absolute top-4 left-4 ${service.badgeColor || 'bg-amber-500'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}
                  >
                    {service.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{service.duration}</span>
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-stone-900">{service.title}</h3>
                  <div className="text-right">
                    <span className="text-xs text-stone-400">起步价</span>
                    <div className="text-2xl font-black text-brand-600">
                      ¥{service.price}
                      <span className="text-xs font-normal text-stone-500">/次起</span>
                    </div>
                  </div>
                </div>
                <p className="text-stone-500 text-xs mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 border-t border-stone-100 pt-4 text-xs text-stone-700">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => openBookingModal(service.title)}
                type="button"
                className="w-full py-3 rounded-xl bg-amber-50 hover:bg-brand-500 text-brand-700 hover:text-white font-bold text-sm transition-all border border-amber-200/70 hover:border-transparent flex items-center justify-center gap-2"
              >
                <span>预约此服务</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
