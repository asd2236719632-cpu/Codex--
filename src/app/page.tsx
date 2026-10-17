import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import Services from '@/components/Services';
import PriceCalculator from '@/components/PriceCalculator';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import EnvironmentGallery from '@/components/EnvironmentGallery';
import TeamSection from '@/components/TeamSection';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import LocationSection from '@/components/LocationSection';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import StoreWheelBackground from '@/components/StoreWheelBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      {/* 4K 店内环境全景背景与悬浮仪表轮盘控制器 */}
      <StoreWheelBackground />

      <Navbar />
      <main className="flex-1 relative z-10">
        <Hero />
        <TrustBadges />
        <Services />
        <PriceCalculator />
        <BeforeAfterSlider />
        <EnvironmentGallery />
        <TeamSection />
        <Testimonials />
        <FaqSection />
        <LocationSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
