export type RecordStatus = 'تم الاستلام' | 'قيد المراجعة' | 'يحتاج استكمال' | 'منشور';

export type Entry = {
  id: string;
  name: string;
  phone: string;
  project: string;
  center: string;
  location: string;
  landmark: string;
  category: string;
  specialties: string[];
  status: string;
  extra: string;
  needs: string[];
  previousSupport: string;
  contactChoice: string;
  recordStatus: RecordStatus;
  createdAt: string;
};

export type RegistrationDraft = Omit<Entry, 'id' | 'recordStatus' | 'createdAt'>;

const STORAGE_KEY = 'anas-community-entries-v1';
const STATUS_KEY = 'anas-community-status-overrides-v1';
const initialRows: Entry[] = [
  { id: 'ANAS-DEMO-001', name: 'يوسف الصديق', phone: '010••••••48', project: 'ورشة نموذجية', center: 'يوسف الصديق', location: 'تونس', landmark: '', category: 'الحرف والمنتجات اليدوية', specialties: ['الفخار والخزف'], status: 'قائم طوال العام', extra: 'لم يضف', needs: ['التصوير والتسويق', 'الوصول للعملاء'], previousSupport: 'لا', contactChoice: 'نعم، عبر واتساب', recordStatus: 'قيد المراجعة', createdAt: '2026-10-05' },
  { id: 'ANAS-DEMO-002', name: 'مريم منصور', phone: '010••••••17', project: 'خدمة صيانة نموذجية', center: 'سنورس', location: 'قرية نموذجية', landmark: '', category: 'المهن والخدمات المساندة', specialties: ['صيانة وإصلاح المعدات'], status: 'موسمي أو حسب الطلب', extra: 'تركيب معدات زراعية', needs: ['التدريب والإدارة'], previousSupport: 'نعم', contactChoice: 'نعم، عبر مكالمة', recordStatus: 'يحتاج استكمال', createdAt: '2026-10-04' },
  { id: 'ANAS-DEMO-003', name: 'أحمد ربيع', phone: '010••••••23', project: 'منتج غذائي نموذجي', center: 'إطسا', location: 'قرية نموذجية', landmark: '', category: 'الطعام والمنتجات المحلية', specialties: ['فطير ومخبوزات'], status: 'تم الاستلام', extra: 'لم يضف', needs: ['التصوير والتسويق'], previousSupport: 'لا', contactChoice: 'نعم، عبر واتساب', recordStatus: 'تم الاستلام', createdAt: '2026-10-03' },
  { id: 'ANAS-DEMO-004', name: 'سلمى عوض', phone: '010••••••65', project: 'إقامة نموذجية', center: 'أبشواي', location: 'قرية نموذجية', landmark: '', category: 'الإقامة والضيافة', specialties: ['بيت ضيافة'], status: 'قائم طوال العام', extra: 'لم يضف', needs: ['الوصول للعملاء'], previousSupport: 'لا', contactChoice: 'نعم، عبر واتساب', recordStatus: 'تم الاستلام', createdAt: '2026-10-02' },
  { id: 'ANAS-DEMO-005', name: 'خالد محمود', phone: '010••••••90', project: 'تدريب نموذجي', center: 'الفيوم', location: 'حي نموذجي', landmark: '', category: 'التدريب والتعليم', specialties: ['تعليم الحرف والفنون'], status: 'موسمي أو حسب الطلب', extra: 'لم يضف', needs: ['تطوير الجودة'], previousSupport: 'لا', contactChoice: 'أشارك في الحصر فقط', recordStatus: 'قيد المراجعة', createdAt: '2026-10-01' },
];

export const recordStore = {
  getSampleRows(): Entry[] {
    return initialRows;
  },
  getAll(): Entry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const saved = stored ? (JSON.parse(stored) as Entry[]) : [];
      const statuses = JSON.parse(localStorage.getItem(STATUS_KEY) ?? '{}') as Record<string, RecordStatus>;
      return [...saved, ...initialRows].map((entry) => statuses[entry.id] ? { ...entry, recordStatus: statuses[entry.id] } : entry);
    } catch {
      return initialRows;
    }
  },
  save(draft: RegistrationDraft): Entry {
    const saved = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Entry[]; } catch { return []; }
    })();
    const nextNumber = String(saved.length + 6).padStart(3, '0');
    const entry: Entry = { ...draft, id: `ANAS-DEMO-${nextNumber}`, recordStatus: 'تم الاستلام', createdAt: new Date().toISOString().slice(0, 10) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...saved]));
    return entry;
  },
  updateStatus(id: string, recordStatus: RecordStatus): void {
    const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Entry[]; } catch { return []; } })();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.map((entry) => entry.id === id ? { ...entry, recordStatus } : entry)));
    const overrides = (() => { try { return JSON.parse(localStorage.getItem(STATUS_KEY) ?? '{}') as Record<string, RecordStatus>; } catch { return {}; } })();
    localStorage.setItem(STATUS_KEY, JSON.stringify({ ...overrides, [id]: recordStatus }));
  },
};

export const categories = [
  'الحرف والمنتجات اليدوية', 'الإقامة والضيافة', 'الطعام والمنتجات المحلية', 'النقل والسفاري',
  'التجارب والإرشاد والأنشطة', 'التدريب والتعليم', 'المهن والخدمات المساندة', 'نشاط آخر',
];
export const centers = ['الفيوم', 'إطسا', 'سنورس', 'طامية', 'أبشواي', 'يوسف الصديق'];
export const needsList = ['الوصول للعملاء', 'التصوير والتسويق', 'تطوير الجودة', 'التدريب والإدارة', 'الخامات والأدوات', 'التغليف والنقل', 'فهم فرص التمويل', 'تنظيم النشاط', 'السلامة والبيئة', 'احتياج آخر'];
