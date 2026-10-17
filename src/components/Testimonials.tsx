'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

export default function Testimonials() {
  const reviews: Testimonial[] = [
    {
      author: '萱萱妈咪',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      petInfo: '宝儿：2岁奶油比熊「球球」',
      content:
        '“以前在别家洗完回家总爱舔脚趾，还特别怕吹风机。这次来萌爪星空，林晨老师真的太温柔了！全透明玻璃我全程看着，球球居然在浴缸里舒服得眯着眼。剪的圆头萌化了，发朋友圈被问爆了哪家洗的！”',
      serviceTag: '日韩萌系修毛 + 碳酸泉SPA',
      timeAgo: '2天前点评',
      rating: 5,
    },
    {
      author: 'Alex 陈先生',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      petInfo: '宝儿：3岁重点色布偶「奥斯卡」',
      content:
        '“猫咪洗澡最怕应激！周野老师的独立猫室太专业了，没有一点狗叫声，光线柔和，还放了猫咪专属音乐。尾巴上的顽固黑头和油脂全部乳化洗干净了，毛蓬松得像一团云，回家没有出现任何应激反应，吹爆！”',
      serviceTag: '猫咪零应激抚慰洗护',
      timeAgo: '1周前点评',
      rating: 5,
    },
    {
      author: '郭郭与大金毛',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      petInfo: '宝儿：70斤大金毛「大壮」',
      content:
        '“家里养大狗每次洗澡都像打仗，自己洗不仅腰酸背痛而且根本吹不透容易得湿疹。他们家专车上门接送简直救星！洗得极其干净，拔出来的浮毛装了一大袋，毛发香了整整两星期，果断办了年卡。”',
      serviceTag: '大型犬脱脂洗护 + 专车接送',
      timeAgo: '3周前点评',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-amber-50/40 border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
            REAL COMMUNITY REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            看看铲屎官们怎么说 · 真实评价
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-2">
            我们视好评如生命。每一次洗护结束，不仅是一次清洁，更是与家长共同见证的成长记录。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-sm text-stone-900">{rev.author}</div>
                      <div className="text-[11px] text-stone-400">{rev.petInfo}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {rev.content}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                  {rev.serviceTag}
                </span>
                <span>{rev.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
