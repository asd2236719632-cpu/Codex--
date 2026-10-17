'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Calendar, Clock, Sparkles, Check, ChevronRight, CalendarCheck, Dog, Cat } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

interface DateOption {
  iso: string;
  label: string; // 今天、明天、后天、周X
  dateStr: string; // 10/17
  dayOfWeek: string; // 周六
  fullDesc: string; // 10月17日 周六
}

const TIMESLOTS = [
  { id: '09:30-11:30', label: '上午场 09:30', tag: '静音清闲' },
  { id: '14:30-17:00', label: '下午档 14:30', tag: '黄金热门' },
  { id: '17:30-20:00', label: '晚间场 17:30', tag: '下班便捷' },
];

export default function BookingDateWidget() {
  const { openBookingModal, showToast } = useModal();
  const dateInputRef = useRef<HTMLInputElement>(null);

  // 动态生成未来4天的日期快捷项
  const dateOptions: DateOption[] = useMemo(() => {
    const list: DateOption[] = [];
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const now = new Date();

    for (let i = 0; i < 4; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      const dayOfWeek = dayNames[d.getDay()];

      const iso = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const label = i === 0 ? '今天' : i === 1 ? '明天' : i === 2 ? '后天' : dayOfWeek;
      const dateStr = `${month}/${date}`;
      const fullDesc = `${month}月${date}日 ${dayOfWeek}`;

      list.push({ iso, label, dateStr, dayOfWeek, fullDesc });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0]?.iso || '');
  const [selectedTime, setSelectedTime] = useState<string>('14:30-17:00');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [customDateStr, setCustomDateStr] = useState('');

  // 处理快速日期选择
  const handleSelectQuickDate = (iso: string) => {
    setSelectedDate(iso);
    setIsCustomDate(false);
  };

  // 处理自定义日期变更
  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setSelectedDate(val);
      setIsCustomDate(true);
      const [y, m, d] = val.split('-');
      setCustomDateStr(`${parseInt(m, 10)}月${parseInt(d, 10)}日`);
    }
  };

  // 点击确认预约
  const handleConfirmBooking = () => {
    const serviceName = petType === 'cat' ? '猫咪专属独立静音SPA' : '犬类活力清爽深层洗护';
    
    // 找出当前日期的友好描述
    const matched = dateOptions.find((d) => d.iso === selectedDate);
    const dateDesc = matched ? `${matched.label} (${matched.dateStr})` : selectedDate;

    openBookingModal({
      date: selectedDate,
      timeslot: selectedTime,
      petCategory: petType,
      service: serviceName,
    });

    showToast(`📅 已锁定【${dateDesc} ${selectedTime.split('-')[0]}】档期，请填写家长信息！`);
  };

  return (
    <div className="relative mt-5 sm:mt-6 bg-stone-950/75 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl text-white transition-all hover:border-amber-400/40">
      {/* 顶部微光光晕点缀 */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* 头部：标题与实时排期状态 */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30 shadow-inner">
            <CalendarCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
              <span>预约到店日期</span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-1.5 py-0.5 rounded-full">
                立减¥20
              </span>
            </h3>
            <p className="text-[11px] text-stone-300">快速锁定专属洗护工位与资深美容师</p>
          </div>
        </div>

        {/* 实时状态徽章 */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>今日尚余3席</span>
        </div>
      </div>

      {/* 1. 到店日期快捷选择胶囊网格 */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[11px] text-stone-300 font-medium mb-1.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>选择到店日期</span>
          </span>
          {isCustomDate && (
            <span className="text-amber-300 font-bold">已选：{customDateStr}</span>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {dateOptions.map((opt) => {
            const isSelected = selectedDate === opt.iso && !isCustomDate;
            return (
              <button
                key={opt.iso}
                type="button"
                onClick={() => handleSelectQuickDate(opt.iso)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all text-center relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500 to-orange-500 text-white font-black shadow-lg shadow-amber-500/30 border border-amber-300/50 scale-[1.02]'
                    : 'bg-stone-900/70 hover:bg-stone-800/80 text-stone-300 border border-white/10 hover:border-white/25'
                }`}
              >
                <span className="text-[10px] font-medium opacity-90 leading-tight">
                  {opt.label}
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-tight mt-0.5">
                  {opt.dateStr}
                </span>
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white text-orange-600 rounded-full flex items-center justify-center shadow">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}

          {/* 更多/自定义日期按钮 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.focus()}
              className={`w-full h-full py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all text-center border ${
                isCustomDate
                  ? 'bg-gradient-to-b from-amber-500 to-orange-500 text-white font-black shadow-lg shadow-amber-500/30 border-amber-300/50'
                  : 'bg-stone-900/70 hover:bg-stone-800/80 text-stone-300 border-white/10 hover:border-white/25'
              }`}
              title="点击日历选择更多日期"
            >
              <Calendar className="w-3.5 h-3.5 mb-0.5 text-amber-300" />
              <span className="text-[10px] font-medium leading-tight">
                {isCustomDate ? '已自选' : '更多'}
              </span>
            </button>
            <input
              ref={dateInputRef}
              type="date"
              min={dateOptions[0]?.iso}
              onChange={handleCustomDateChange}
              className="absolute inset-0 opacity-0 pointer-events-auto cursor-pointer"
              aria-label="选择任意预约日期"
            />
          </div>
        </div>
      </div>

      {/* 2. 时段 & 宠物品类选择 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-3.5">
        {/* 时段快速切换 (占 7 列) */}
        <div className="sm:col-span-7">
          <div className="flex items-center gap-1 text-[11px] text-stone-300 font-medium mb-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>到店时间段</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {TIMESLOTS.map((slot) => {
              const isSelected = selectedTime === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTime(slot.id)}
                  className={`py-1.5 px-1 rounded-xl text-center transition-all border ${
                    isSelected
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-sm'
                      : 'bg-stone-900/60 hover:bg-stone-800/60 border-white/10 text-stone-300 text-[11px]'
                  }`}
                >
                  <div className="text-[11px] leading-tight font-medium">{slot.label.replace(' 09:30', '').replace(' 14:30', '').replace(' 17:30', '')}</div>
                  <div className="text-[9px] text-stone-400 mt-0.5 scale-90">{slot.id.split('-')[0]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 宠物类别切换 (占 5 列) */}
        <div className="sm:col-span-5">
          <div className="text-[11px] text-stone-300 font-medium mb-1.5">
            <span>爱宠类型</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setPetType('dog')}
              className={`py-1.5 px-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all border ${
                petType === 'dog'
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 border-white/10 text-stone-300'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              <span>汪星人</span>
            </button>
            <button
              type="button"
              onClick={() => setPetType('cat')}
              className={`py-1.5 px-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all border ${
                petType === 'cat'
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 border-white/10 text-stone-300'
              }`}
            >
              <Cat className="w-3.5 h-3.5" />
              <span>喵星人</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 预约行动呼吁按钮 */}
      <button
        onClick={handleConfirmBooking}
        type="button"
        className="w-full py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-brand-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs sm:text-sm shadow-glow hover:shadow-hover active:translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
      >
        <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
        <span>立即锁定该到店档期</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* 底部保障与安心提示 */}
      <div className="mt-2 text-center text-[10px] text-stone-400 flex items-center justify-center gap-2">
        <span>✓ 预约免排队</span>
        <span>·</span>
        <span>✓ 到店付款立减¥20</span>
        <span>·</span>
        <span>✓ 随时免费改期</span>
      </div>
    </div>
  );
}
