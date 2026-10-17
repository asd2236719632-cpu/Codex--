'use client';

import React, { useState } from 'react';
import { Cat, Dog, Gift, Timer, Check, Send } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { PetType, FurCondition, PlanPackage } from '@/types';

export default function PriceCalculator() {
  const { openBookingModal } = useModal();

  const [petType, setPetType] = useState<PetType>('small_dog');
  const [basePrice, setBasePrice] = useState(88);
  const [furCondition, setFurCondition] = useState<FurCondition>('smooth');
  const [plan, setPlan] = useState<PlanPackage>('classic');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 宠型定义
  const petTypes = [
    {
      id: 'cat' as PetType,
      name: '猫咪宝贝',
      sub: '英短/布偶/美短等',
      tag: '全品种',
      price: 98,
      icon: Cat,
    },
    {
      id: 'small_dog' as PetType,
      name: '小型犬',
      sub: '泰迪/比熊/雪纳瑞',
      tag: '<8kg',
      price: 88,
      icon: Dog,
    },
    {
      id: 'medium_dog' as PetType,
      name: '中型犬',
      sub: '柯基/柴犬/法斗',
      tag: '8-18kg',
      price: 138,
      icon: Dog,
    },
    {
      id: 'large_dog' as PetType,
      name: '大型犬',
      sub: '金毛/边牧/萨摩耶',
      tag: '18kg+',
      price: 198,
      icon: Dog,
    },
  ];

  // 毛发状态定义
  const furConditions = [
    {
      id: 'smooth' as FurCondition,
      title: '顺滑健康',
      desc: '定期梳理几乎无毛结',
      price: 0,
    },
    {
      id: 'tangled_light' as FurCondition,
      title: '轻度微结',
      desc: '耳后或腿窝局部小团块',
      price: 30,
    },
    {
      id: 'tangled_heavy' as FurCondition,
      title: '重度成片',
      desc: '大面积毡化需耗时解结',
      price: 60,
    },
  ];

  // 套餐级别定义
  const plans = [
    {
      id: 'classic' as PlanPackage,
      title: '经典净澈洗护',
      desc: '12道工序精洗 + 吹水拉毛 + 指甲耳道肛门腺全套清洁',
      price: 0,
      time: 60,
    },
    {
      id: 'spa' as PlanPackage,
      title: '碳酸泉微气泡水疗',
      desc: '在经典洗护基础上，增加日本微气泡浴缸深度活肤SPA',
      price: 40,
      time: 75,
      tag: '人气王',
    },
    {
      id: 'cut' as PlanPackage,
      title: '全身体态精细修毛造型',
      desc: '经典洗护 + A级美容师手工剪形，精致圆头/日韩萌系造型',
      price: 70,
      time: 110,
      tag: '精细剪形',
    },
  ];

  // 增值定制项定义
  const addons = [
    {
      id: 'addon-teeth',
      title: '纳米超声波口腔洁齿脱结石',
      desc: '软化牙垢牙石、清新口气',
      price: 39,
      time: 15,
    },
    {
      id: 'addon-paw',
      title: '滋润护爪肉垫SPA霜润养',
      desc: '防干裂倒刺、粉嫩软弹',
      price: 25,
      time: 10,
    },
    {
      id: 'addon-medic',
      title: '换季草本微晶抑菌药浴',
      desc: '针对红斑皮屑、驱虫止痒',
      price: 49,
      time: 20,
    },
    {
      id: 'addon-shuttle',
      title: '周边5公里内专车上门接送',
      desc: '恒温消杀专车、省心免奔波',
      price: 45,
      time: 0,
    },
  ];

  const handlePetTypeSelect = (type: PetType, price: number) => {
    setPetType(type);
    setBasePrice(price);
  };

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // 计算价格
  const currentFurPrice = furConditions.find((f) => f.id === furCondition)?.price || 0;
  const currentPlan = plans.find((p) => p.id === plan) || plans[0];
  const currentPlanPrice = currentPlan.price;
  const currentPlanTime = currentPlan.time;

  const currentAddonPrice = selectedAddons.reduce((sum, id) => {
    const item = addons.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const currentAddonTime = selectedAddons.reduce((sum, id) => {
    const item = addons.find((a) => a.id === id);
    return sum + (item ? item.time : 0);
  }, 0);

  const discount = 20;
  const rawTotal = basePrice + currentFurPrice + currentPlanPrice + currentAddonPrice;
  const finalPrice = Math.max(rawTotal - discount, 0);
  const totalTime = currentPlanTime + currentAddonTime;

  const handleBookWithPlan = () => {
    const petTypeName = petTypes.find((p) => p.id === petType)?.name || '宠物';
    const planName = currentPlan.title;
    openBookingModal(`${planName} (${petTypeName}预估套餐)`);
  };

  return (
    <section
      id="calculator"
      className="py-20 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-amber-50/60 border-y border-amber-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-amber-200 shadow-sm">
            SMART ESTIMATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            智能洗护费用与时长预估器
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-2">
            价格透明无隐形消费。勾选毛孩子具体身体体型与需求，系统即时计算透明总价与建议用时。
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 左侧选择项表单 */}
          <div className="lg:col-span-7 space-y-8">
            {/* 第一步：选择宠物类型与体型 */}
            <div>
              <label className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>毛孩子品种与体型</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {petTypes.map((pt) => {
                  const IconComp = pt.icon;
                  const isSelected = petType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handlePetTypeSelect(pt.id, pt.price)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-amber-50 shadow-sm'
                          : 'border-stone-200 hover:border-brand-400 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <IconComp className="w-5 h-5 text-amber-600" />
                        <span
                          className={`text-[10px] font-bold ${
                            isSelected ? 'text-brand-600' : 'text-stone-400'
                          }`}
                        >
                          {pt.tag}
                        </span>
                      </div>
                      <div className="font-bold text-sm text-stone-900">{pt.name}</div>
                      <div className="text-[11px] text-stone-500">{pt.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 第二步：毛发状态与难度 */}
            <div>
              <label className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>当前毛发状态</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {furConditions.map((fc) => {
                  const isSelected = furCondition === fc.id;
                  return (
                    <label
                      key={fc.id}
                      onClick={() => setFurCondition(fc.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-amber-50'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="fur"
                        checked={isSelected}
                        onChange={() => setFurCondition(fc.id)}
                        className="text-brand-500 focus:ring-brand-400"
                      />
                      <div>
                        <div className="font-bold text-sm text-stone-900 flex items-center justify-between">
                          <span>{fc.title}</span>
                          <span className="text-xs font-semibold text-amber-600">
                            {fc.price === 0 ? '+¥0' : `+¥${fc.price}`}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">{fc.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 第三步：洗护套餐方案升级 */}
            <div>
              <label className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>选择洗护方案级别</span>
              </label>
              <div className="space-y-2.5">
                {plans.map((pl) => {
                  const isSelected = plan === pl.id;
                  return (
                    <label
                      key={pl.id}
                      onClick={() => setPlan(pl.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-amber-50/60'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="plan"
                          checked={isSelected}
                          onChange={() => setPlan(pl.id)}
                          className="text-brand-500 focus:ring-brand-400"
                        />
                        <div>
                          <div className="font-bold text-sm text-stone-900 flex items-center gap-2">
                            <span>{pl.title}</span>
                            {pl.tag && (
                              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                                {pl.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">{pl.desc}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-brand-600 text-sm">
                          {pl.price === 0 ? '标配' : `+¥${pl.price}`}
                        </span>
                        <div className="text-[10px] text-stone-400">约{pl.time}分钟</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 第四步：定制加享增值护理 */}
            <div>
              <label className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>可选增值精细护理</span>
                <span className="text-xs text-stone-400 font-normal">（可多选）</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-brand-400 bg-amber-50/50'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-brand-500 focus:ring-brand-400 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-xs font-bold text-stone-900">
                          <span>{addon.title}</span>
                          <span className="text-amber-600 font-mono">+¥{addon.price}</span>
                        </div>
                        <div className="text-[11px] text-stone-500">{addon.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧：预估结算看板 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  ESTIMATION SUMMARY
                </span>
                <h3 className="text-xl font-black text-white mt-1">明细报价看板</h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
                <Timer className="w-5 h-5" />
              </div>
            </div>

            {/* 价格细分列表 */}
            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-stone-300">
                <span>宠物体型洗护基础价</span>
                <span className="font-mono font-bold text-white">¥{basePrice}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>毛发打结开结加价</span>
                <span className="font-mono font-bold text-white">¥{currentFurPrice}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>套餐方案级别升级</span>
                <span className="font-mono font-bold text-white">¥{currentPlanPrice}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>增值定制项目合算</span>
                <span className="font-mono font-bold text-white">¥{currentAddonPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-400 pt-1">
                <span className="flex items-center gap-1">
                  <Gift className="w-3 h-3" />
                  <span>首次线上预约特惠</span>
                </span>
                <span className="font-mono font-bold">-¥{discount}</span>
              </div>
            </div>

            {/* 总价与时长展示 */}
            <div className="grid grid-cols-2 gap-4 mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div>
                <div className="text-[11px] text-stone-400">预计总花费 (已减免)</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1 flex items-baseline">
                  <span className="text-base font-normal mr-0.5">¥</span>
                  <span>{finalPrice}</span>
                </div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="text-[11px] text-stone-400">预计服务用时</div>
                <div className="text-2xl font-bold text-white mt-1.5 flex items-baseline gap-1">
                  <Timer className="w-5 h-5 text-amber-400" />
                  <span>{totalTime}</span>
                  <span className="text-xs text-stone-400 font-normal">分钟</span>
                </div>
              </div>
            </div>

            {/* 承诺贴士 */}
            <div className="text-[11px] text-stone-400 space-y-1.5 mb-8">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>报价即终价，到店不临时推销加价</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>免费赠送洗护过程高清照与微视频</span>
              </div>
            </div>

            {/* 按钮：带参预约 */}
            <button
              onClick={handleBookWithPlan}
              type="button"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>带入此方案，锁定今天档期</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
