'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, BadgeCheck } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { BookingTicket } from '@/types';

export default function BookingModal() {
  const { bookingModalOpen, closeBookingModal, defaultService, showToast } = useModal();

  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [petCategory, setPetCategory] = useState<'dog' | 'cat'>('dog');
  const [petName, setPetName] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [date, setDate] = useState('');
  const [timeslot, setTimeslot] = useState('14:30-17:00');
  const [serviceItem, setServiceItem] = useState(defaultService);
  const [notes, setNotes] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [ticket, setTicket] = useState<BookingTicket | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (defaultService) {
      setServiceItem(defaultService);
    }
  }, [defaultService]);

  if (!bookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomOrder = 'PG' + Math.floor(100000 + Math.random() * 900000);
    const newTicket: BookingTicket = {
      id: randomOrder,
      owner: ownerName,
      pet: `${petName} (家长：${ownerName})`,
      service: serviceItem,
      date: date,
      time: timeslot,
      address: '上海市宜川路街道贾运620号',
    };

    setTicket(newTicket);
    setIsSuccess(true);

    try {
      localStorage.setItem('last_pet_booking', JSON.stringify({
        ...newTicket,
        createAt: new Date().toISOString(),
      }));
    } catch {}

    showToast('🎉 预约成功提交！店长将在15分钟内与您确认');
  };

  const handleClose = () => {
    setIsSuccess(false);
    setTicket(null);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-stone-100 transform transition-all">
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
          aria-label="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <>
            {/* 模态框标题 */}
            <div className="mb-6">
              <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                ONLINE RESERVATION
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 mt-2">
                预约星级宠物洗护
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                提交后专属美容师将在15分钟内致电/微信确认档期详情
              </p>
            </div>

            {/* 表单主体 */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    家长姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="例如：李女士"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    联系手机号 *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{11}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="11位手机号码"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    宠物类型 *
                  </label>
                  <select
                    value={petCategory}
                    onChange={(e) => setPetCategory(e.target.value as 'dog' | 'cat')}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-stone-800"
                  >
                    <option value="dog">狗狗汪星人</option>
                    <option value="cat">猫咪喵星人</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    爱宠名字 *
                  </label>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="例如：波波"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    体重大约 (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                    placeholder="如：5.5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    预约日期 *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1.5">
                    期望时段 *
                  </label>
                  <select
                    value={timeslot}
                    onChange={(e) => setTimeslot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-stone-800"
                  >
                    <option value="09:30-11:30">上午场 09:30 - 11:30 (安静清闲)</option>
                    <option value="12:00-14:00">午间场 12:00 - 14:00</option>
                    <option value="14:30-17:00">下午黄金档 14:30 - 17:00</option>
                    <option value="17:30-20:00">晚间场 17:30 - 20:00 (下班方便)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1.5">
                  预约洗护服务项目 *
                </label>
                <input
                  type="text"
                  required
                  value={serviceItem}
                  onChange={(e) => setServiceItem(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1.5">
                  特殊习性与注意事项（选填）
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="如：胆小敏感、不要碰尾巴、近期有轻微换季皮屑、需要专车接送等..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-800 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>立即确认提交预约</span>
                </button>
                <p className="text-center text-[11px] text-stone-400 mt-2">
                  到店付款即可，无需提前充值，到店享受新客立减 ¥20 优惠
                </p>
              </div>
            </form>
          </>
        ) : (
          /* 提交成功反馈票据 */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <BadgeCheck className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-stone-900">恭喜！预约申请已成功提交</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              我们已为您在系统预留洗护工位，客服人员正在核对排期，稍后会主动与您电话或微信确认。
            </p>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-left text-xs text-stone-700 max-w-sm mx-auto space-y-2">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-400">预约单号：</span>
                <span className="font-mono font-bold text-brand-600">{ticket?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">爱宠：</span>
                <span className="font-bold">{ticket?.pet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">服务：</span>
                <span className="font-bold">{ticket?.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">时间：</span>
                <span className="font-bold text-amber-600">
                  {ticket?.date} {ticket?.time}
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-200/60 pt-2">
                <span className="text-stone-400">到店地址：</span>
                <span className="font-bold text-stone-800">{ticket?.address}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              type="button"
              className="px-8 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-all"
            >
              完成并关闭
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
