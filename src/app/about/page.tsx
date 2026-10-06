import type { Metadata } from 'next';
import { AboutPage } from '../../features/site/SitePages';

export const metadata: Metadata = {
  title: 'عن أنس | مؤسسة أنس للتنمية البيئية والمجتمعية',
  description: 'تعرّف على أنس ومبادرتها للتعريف بالأنشطة المحلية وفهم احتياجات أصحابها في الفيوم.',
};

export default function AboutRoute() {
  return <AboutPage />;
}
