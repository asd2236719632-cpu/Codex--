"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PawPrint, MapPin, MessageCircle, CalendarHeart, Calendar, Menu, X } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function Navbar() {
  const { openBookingModal, openContactModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "洗护套餐" },
    {
      href: "#calculator",
      label: "智能估价",
      badge: "测测费用",
    },
    { href: "#before-after", label: "洗护蜕变" },
    { href: "#environment", label: "透明环境" },
    { href: "#team", label: "金牌团队" },
    { href: "#testimonials", label: "家长口碑" },
    { href: "#faq", label: "常见解答" },
    {
      href: "#location",
      label: "门店地图",
      highlight: true,
    },
  ];

  return (
    <header
      id="navbar"
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? "shadow-md bg-white/95 border-stone-200/80 text-stone-900"
          : "bg-stone-950/45 backdrop-blur-xl border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
        <div className="flex items-center justify-between h-20 gap-2 xl:gap-4">
          {/* 品牌标识 */}
          <Link href="#" className="flex items-center gap-2 xl:gap-3 group shrink-0">
            <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-xl xl:rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-300 shrink-0">
              <PawPrint className="w-5 h-5 xl:w-6 xl:h-6 fill-white/20" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span
                  className={`text-lg xl:text-xl font-extrabold tracking-tight transition-colors ${
                    scrolled ? "text-stone-900 group-hover:text-brand-600" : "text-white group-hover:text-amber-300"
                  }`}
                >
                  萌爪星空
                </span>
                <span className="text-[9px] xl:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-400/90 text-stone-950 rounded-md shrink-0">
                  SPA & Grooming
                </span>
              </div>
              <p
                className={`text-[10px] xl:text-xs font-medium tracking-wider transition-colors whitespace-nowrap ${
                  scrolled ? "text-stone-500" : "text-stone-300"
                }`}
              >
                PAWS & GLOW 宠物生活馆
              </p>
            </div>
          </Link>

          {/* 桌面端菜单导航 */}
          <nav
            className={`hidden lg:flex items-center space-x-1 xl:space-x-3.5 2xl:space-x-5 font-medium text-xs xl:text-[13px] 2xl:text-sm transition-colors shrink-0 ${
              scrolled ? "text-stone-700" : "text-stone-200"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`py-1.5 px-1.5 xl:px-2 rounded-lg transition-colors flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 ${
                  link.highlight
                    ? scrolled
                      ? "font-bold text-brand-600 hover:text-brand-700 hover:bg-brand-50/60"
                      : "font-bold text-amber-300 hover:text-white hover:bg-white/10"
                    : scrolled
                    ? "hover:text-brand-600 hover:bg-stone-100/70"
                    : "hover:text-amber-300 hover:bg-white/10"
                }`}
              >
                {link.highlight && (
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${scrolled ? "text-brand-500" : "text-amber-300"}`}
                  />
                )}
                <span className="whitespace-nowrap">{link.label}</span>
                {link.badge && (
                  <>
                    <span
                      className="xl:hidden inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0"
                      title={link.badge}
                    />
                    <span
                      className={`hidden xl:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0 ${
                        scrolled ? "bg-amber-100 text-amber-700" : "bg-amber-400/20 text-amber-300 border border-amber-300/30"
                      }`}
                    >
                      {link.badge}
                    </span>
                  </>
                )}
              </a>
            ))}
          </nav>

          {/* 右侧行动号召 */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 shrink-0">
            <button
              onClick={openContactModal}
              type="button"
              className={`font-medium text-xs xl:text-sm flex items-center gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                scrolled
                  ? "text-stone-700 hover:text-brand-600 hover:bg-amber-50/80"
                  : "text-stone-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <MessageCircle className={`w-4 h-4 shrink-0 ${scrolled ? "text-brand-500" : "text-amber-300"}`} />
              <span className="whitespace-nowrap">微信客服</span>
            </button>
            <button
              onClick={() => openBookingModal()}
              type="button"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full group-hover:opacity-90 transition-opacity" />
              <span className="relative block px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xs xl:text-sm shadow-soft group-hover:shadow-hover transition-all flex items-center gap-1.5 xl:gap-2 whitespace-nowrap">
                <CalendarHeart className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">在线预约</span>
              </span>
            </button>
          </div>

          {/* 移动端/平板端快捷按钮与汉堡菜单按钮 */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openContactModal}
              type="button"
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? "text-stone-700 hover:bg-stone-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="微信客服"
              title="微信客服"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => openBookingModal()}
              type="button"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>预约</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? "text-stone-700 hover:bg-stone-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="打开菜单"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端/平板端折叠菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200/80 bg-white/95 px-6 py-6 space-y-4 shadow-lg backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-800 font-medium text-base hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-center flex items-center justify-center gap-2"
            >
              <CalendarHeart className="w-4 h-4" />
              <span>立即在线预约</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openContactModal();
              }}
              type="button"
              className="w-full py-3 rounded-xl bg-stone-100 text-stone-800 font-bold text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-brand-500" />
              <span>添加微信客服</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
