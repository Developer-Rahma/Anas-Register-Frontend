'use client';

import { useEffect, useState } from 'react';
import { Modal } from './Modal';

export function PrivacyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-privacy', show);
    return () => window.removeEventListener('open-privacy', show);
  }, []);

  if (!open) return null;

  return (
    <Modal title="الخصوصية واستخدام البيانات" onClose={() => setOpen(false)}>
      <p>نستخدم بياناتك للحصر ودراسة الاحتياجات والمتابعة وفق اختياراتك. لا ننشر بياناتك أو وسائل تواصلك تلقائيًا. يمكنك طلب تعديل بياناتك أو حذفها بالتواصل معنا.</p>
      <a className="button button-outline full-width" href="https://wa.me/201030609048">طلب تعديل أو حذف البيانات</a>
    </Modal>
  );
}
