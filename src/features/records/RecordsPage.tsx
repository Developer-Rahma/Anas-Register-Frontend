'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { BarChart3, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Database, Download, FileText, Grid2X2, Plus, Search, Settings, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import { Modal } from '../../shared/Modal';
import { recordStore, type Entry, type RecordStatus } from '../registration/data';

const statusValues: RecordStatus[] = ['تم الاستلام', 'قيد المراجعة', 'يحتاج استكمال', 'منشور'];

export function RecordsPage() {
  const [records, setRecords] = useState<Entry[]>(() => recordStore.getSampleRows());
  const [search, setSearch] = useState('');
  const [center, setCenter] = useState('');
  const [category, setCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Entry | null>(null);
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState('');
  const perPage = 8;
  useEffect(() => {
    setRecords(recordStore.getAll());
  }, []);
  const visible = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return records.filter((entry) => {
      const matches = !query || [entry.id, entry.name, entry.project, entry.phone, entry.location, entry.center].some((value) => value.toLocaleLowerCase().includes(query));
      return matches && (!center || entry.center === center) && (!category || entry.category === category) && (!statusFilter || entry.recordStatus === statusFilter);
    });
  }, [records, search, center, category, statusFilter]);
  const paginated = visible.slice((page - 1) * perPage, page * perPage);
  const updateStatus = (entry: Entry, value: RecordStatus) => {
    recordStore.updateStatus(entry.id, value);
    setRecords((current) => current.map((item) => item.id === entry.id ? { ...item, recordStatus: value } : item));
    if (selected?.id === entry.id) setSelected({ ...entry, recordStatus: value });
    setNotice(`تم تحديث حالة ${entry.id}`);
    window.setTimeout(() => setNotice(''), 2400);
  };
  const exportCsv = () => {
    const columns = ['رقم التسجيل', 'اسم النشاط', 'صاحب النشاط', 'المركز', 'القرية / الحي', 'الفئة', 'حالة المراجعة', 'تاريخ التسجيل'];
    const rows = visible.map((item) => [item.id, item.project, item.name, item.center, item.location, item.category, item.recordStatus, item.createdAt]);
    const csv = [columns, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'anas-records.csv'; anchor.click(); URL.revokeObjectURL(url);
  };
  const clearFilters = () => { setSearch(''); setCenter(''); setCategory(''); setStatusFilter(''); setPage(1); };
  return <main className="admin-shell" dir="rtl">
    <aside className="admin-sidebar">
      <Link href="/" className="admin-logo">أنس<span>.</span><small>إدارة الحصر</small></Link>
      <nav className="admin-menu">
        <button className="active"><FileText size={18} /> السجلات</button>
        <button onClick={() => setNotice('شاشة المتابعة قيد التجهيز')}><ClipboardList size={18} /> المتابعة</button>
        <button onClick={() => setNotice('تصنيفات الأنشطة المسجلة')}><Grid2X2 size={18} /> الفئات</button>
        <button onClick={() => setNotice('مصادر التسجيل')}><Database size={18} /> مصادر التسجيل</button>
        <button onClick={() => setNotice('إعدادات الحصر')}><Settings size={18} /> الإعدادات</button>
      </nav>
      <div className="sidebar-bottom"><span>مساحة عمل داخلية</span><b>لفريق أنس</b><Link href="/">العودة للموقع ↗</Link></div>
    </aside>
    <div className="admin-content">
      <header className="admin-topbar"><div><Link href="/" className="admin-logo mobile-admin-logo">أنس<span>.</span></Link><span className="preview-tag">معاينة تصميمية — بيانات تمثيلية</span></div><div className="admin-top-actions"><button className="button button-outline" onClick={exportCsv} data-testid="button-export"><Download size={16} /> تصدير مخرجات</button><Link href="/register" className="button button-primary" data-testid="link-admin-add"><Plus size={17} /> إضافة تسجيل بمساعدة</Link></div></header>
      <section className="admin-heading"><div><h1>حصر الأنشطة المحلية</h1><p>متابعة التسجيلات واستكمال البيانات وتنظيم المراجعة.</p></div><button className="icon-button" aria-label="مساعدة" onClick={() => setNotice('هذه معاينة إدارية للبيانات المسجلة محليًا.')}><CircleHelp /></button></section>
      {notice && <div className="admin-notice" role="status" data-testid="text-admin-notice">{notice}<button onClick={() => setNotice('')} aria-label="إغلاق"><X size={14} /></button></div>}
      <section className="metric-grid">
        <Metric title="إجمالي السجلات" value={records.length} icon={<FileText />} tone="mint" />
        <Metric title="يحتاج استكمالًا" value={records.filter((item) => item.recordStatus === 'يحتاج استكمال').length} icon={<ClipboardList />} tone="peach" />
        <Metric title="قيد المراجعة" value={records.filter((item) => item.recordStatus === 'قيد المراجعة').length} icon={<BarChart3 />} tone="gold" />
      </section>
      <section className="filter-panel">
        <label className="search-field"><Search size={17} /><input type="search" placeholder="ابحث باسم النشاط أو رقم التسجيل" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} data-testid="input-search-records" /></label>
        <div className="filter-row">
          <Filter label="المركز"><select value={center} onChange={(e) => { setCenter(e.target.value); setPage(1); }} data-testid="filter-center"><option value="">الكل</option>{[...new Set(records.map((item) => item.center))].map((item) => <option key={item}>{item}</option>)}</select></Filter>
          <Filter label="الفئة"><select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} data-testid="filter-category"><option value="">الكل</option>{[...new Set(records.map((item) => item.category))].map((item) => <option key={item}>{item}</option>)}</select></Filter>
          <Filter label="حالة المراجعة"><select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} data-testid="filter-status"><option value="">الكل</option>{statusValues.map((item) => <option key={item}>{item}</option>)}</select></Filter>
          <button className="clear-filters" onClick={clearFilters} data-testid="button-clear-filters"><SlidersHorizontal size={15} /> مسح الفلاتر</button>
        </div>
      </section>
      <section className="records-table-wrap">
        {paginated.length ? <div className="table-scroll"><table className="records-table">
          <thead><tr><th>رقم التسجيل</th><th>اسم النشاط</th><th>المركز / القرية أو الحي</th><th>الفئة</th><th>حالة المراجعة</th><th>آخر متابعة</th><th>الإجراء</th></tr></thead>
          <tbody>{paginated.map((entry) => <tr key={entry.id} data-testid={`row-record-${entry.id}`}><td className="record-id">{entry.id}</td><td><b>{entry.project || entry.category}</b><small>{entry.name}</small></td><td>{entry.center} / {entry.location}</td><td>{entry.category}</td><td><StatusSelect value={entry.recordStatus} onChange={(value) => updateStatus(entry, value)} id={entry.id} /></td><td>لم يبدأ</td><td><button className="button button-outline small-button" onClick={() => setSelected(entry)} data-testid={`button-view-${entry.id}`}>عرض السجل</button></td></tr>)}</tbody>
        </table></div> : <div className="records-empty"><div className="empty-icon"><Search /></div><h2>لا توجد سجلات مطابقة</h2><p>جرّب تعديل كلمات البحث أو مسح الفلاتر.</p><button className="button button-outline" onClick={clearFilters}>مسح الفلاتر</button></div>}
        <div className="table-bottom"><span>عرض {visible.length ? (page - 1) * perPage + 1 : 0}–{Math.min(page * perPage, visible.length)} من {visible.length} سجل</span><div className="pagination"><button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="السابق" data-testid="button-page-previous"><ChevronRight size={17} /></button><span>{page}</span><button onClick={() => setPage(Math.min(Math.ceil(visible.length / perPage), page + 1))} disabled={page >= Math.ceil(visible.length / perPage)} aria-label="التالي" data-testid="button-page-next"><ChevronLeft size={17} /></button></div></div>
        <p className="table-disclaimer"><ShieldCheck size={14} /> هذه سجلات تمثيلية مع البيانات المحفوظة على هذا الجهاز. لا تعني الموافقة على نشرها.</p>
      </section>
    </div>
    {selected && <Modal title="تفاصيل التسجيل" onClose={() => setSelected(null)}><div className="detail-grid">{[['رقم التسجيل', selected.id], ['اسم صاحب النشاط', selected.name], ['رقم الموبايل', selected.phone], ['اسم النشاط', selected.project || selected.category], ['المركز', selected.center], ['القرية / الحي', selected.location], ['الفئة', selected.category], ['التخصص', selected.specialties.join('، ')], ['حالة النشاط', selected.status], ['الاحتياجات', selected.needs.join('، ')], ['اختيار التواصل', selected.contactChoice], ['تاريخ التسجيل', selected.createdAt]].map(([label, value]) => <div key={label}><span>{label}</span><b>{value || '—'}</b></div>)}</div><label className="field detail-status"><span>حالة المراجعة</span><StatusSelect value={selected.recordStatus} onChange={(value) => updateStatus(selected, value)} id={`detail-${selected.id}`} /></label><button className="button button-outline full-width" onClick={() => { setSelected(null); setNotice('لم يتم إعداد نظام تواصل داخلي بعد.'); }}>إضافة متابعة</button></Modal>}
  </main>;
}

function Metric({ title, value, icon, tone }: { title: string; value: number; icon: ReactNode; tone: string }) {
  return <article className="metric-card"><div><span>{title}</span><strong>{value.toLocaleString('ar-EG')}</strong></div><span className={`metric-icon ${tone}`}>{icon}</span></article>;
}
function Filter({ label, children }: { label: string; children: ReactNode }) { return <label className="filter-field"><span>{label}</span>{children}</label>; }
function StatusSelect({ value, onChange, id }: { value: RecordStatus; onChange: (value: RecordStatus) => void; id: string }) {
  const statusClass = value === 'تم الاستلام' || value === 'منشور' ? 'received' : value === 'قيد المراجعة' ? 'review' : 'incomplete';
  return <select className={`status-select ${statusClass}`} value={value} onChange={(e) => onChange(e.target.value as RecordStatus)} aria-label={`تغيير حالة ${id}`} data-testid={`select-record-status-${id}`}>{statusValues.map((status) => <option key={status}>{status}</option>)}</select>;
}
