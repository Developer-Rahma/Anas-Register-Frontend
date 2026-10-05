import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="confirmation-shell" dir="rtl">
      <section className="confirmation-card">
        <h1>الصفحة غير موجودة</h1>
        <Link href="/" className="button button-primary">العودة إلى الرئيسية</Link>
      </section>
    </main>
  );
}
