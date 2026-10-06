import type { Metadata } from 'next';
import { ContactPage } from '../../features/site/SitePages';

export const metadata: Metadata = {
  title: 'تواصل معنا | أنس',
  description: 'تواصل مع فريق أنس للمساعدة في تسجيل نشاطك المحلي في الفيوم.',
};

export default function ContactRoute() {
  return <ContactPage />;
}
