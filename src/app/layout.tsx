import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/context/ModalContext';
import BookingModal from '@/components/BookingModal';
import MapModal from '@/components/MapModal';
import ContactModal from '@/components/ContactModal';
import Toast from '@/components/Toast';
import BackToTop from '@/components/BackToTop';

export const metadata: Metadata = {
  title: '萌爪星空 · Paws & Glow | 现代高端宠物洗护美学生活馆',
  description:
    '专注猫犬低应激定制洗护、全透明可视化洗护间、进口天然植物精油香波，国家认证A级美容师主理，让洗护成为毛孩子的治愈SPA之旅。',
  keywords: [
    '宠物洗护',
    '宠物SPA',
    '宠物美容',
    '萌爪星空',
    'Paws & Glow',
    '猫咪低应激洗澡',
    '狗狗洗护',
    '上海宠物店',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth bg-warm-bg">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900 bg-transparent">
        <ModalProvider>
          {children}
          <BookingModal />
          <MapModal />
          <ContactModal />
          <Toast />
          <BackToTop />
        </ModalProvider>
      </body>
    </html>
  );
}
