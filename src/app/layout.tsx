import type { Metadata } from 'next';
import { PrivacyNotice } from '../shared/PrivacyNotice';
import './globals.css';

export const metadata: Metadata = {
  title: 'أنس | تسجيل الأنشطة المحلية',
  description: 'سجّل نشاطك المحلي في الفيوم وساعدنا على فهم احتياجات المجتمع.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <PrivacyNotice />
      </body>
    </html>
  );
}
