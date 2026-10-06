import Link from 'next/link';
import { ArrowLeft, HeartHandshake, Leaf, MapPinned, MessageCircle, Phone, ShieldCheck, UsersRound } from 'lucide-react';
import { SiteFooter, SiteHeader } from '../../shared/SiteChrome';

export function AboutPage() {
  return <div className="info-page" dir="rtl">
    <SiteHeader activePath="/about" />
    <main>
      <section className="info-hero page-width">
        <div className="info-hero-copy">
          <span className="eyebrow">مؤسسة أنس للتنمية البيئية والمجتمعية</span>
          <h1>من قلب الفيوم،<br />نبدأ الحكاية معًا.</h1>
          <p>أنس مساحة للتعريف بالأنشطة المحلية وفهم احتياجات أصحابها، لتكون خبرات المجتمع جزءًا من تنمية أكثر قربًا واستدامة.</p>
          <Link href="/register" className="button button-primary">عرّفنا بنشاطك <ArrowLeft size={17} /></Link>
        </div>
        <div className="info-hero-art" role="img" aria-label="حرفة الفخار من قلب الفيوم">
          <span>حرفة محلية<br />من الفيوم</span>
        </div>
      </section>

      <section className="info-story page-width">
        <div className="info-section-heading">
          <span className="eyebrow">حكاية أنس</span>
          <h2>نرى قيمة التفاصيل المحلية</h2>
          <p>في كل قرية ومركز، هناك حرفة أو خدمة أو تجربة تحكي شيئًا عن المكان وأهله.</p>
        </div>
        <div className="info-values">
          <article className="info-value-card"><span><UsersRound size={22} /></span><h3>المجتمع أولًا</h3><p>نبدأ بالاستماع لأصحاب الأنشطة والتعرّف إلى ما يحتاجونه فعلًا.</p></article>
          <article className="info-value-card"><span><MapPinned size={22} /></span><h3>من كل مراكز الفيوم</h3><p>نحتفي بتنوّع المجتمعات والأنشطة المحلية في أنحاء المحافظة.</p></article>
          <article className="info-value-card"><span><Leaf size={22} /></span><h3>تنمية أقرب للمكان</h3><p>نؤمن بأهمية التنمية البيئية والمجتمعية المرتبطة بموارد المكان وأهله.</p></article>
        </div>
      </section>

      <section className="info-promise page-width">
        <ShieldCheck size={27} />
        <div><h2>التعريف بالنشاط يبدأ بموافقتك</h2><p>التسجيل يساعدنا على فهم الأنشطة واحتياجاتها، ولا يعني نشر بياناتك تلقائيًا أو ضمان دعم أو فرصة عمل أو ترخيص.</p></div>
      </section>

      <section className="info-bottom-cta page-width">
        <HeartHandshake size={28} />
        <div><h2>نشاطك جزء من حكاية الفيوم</h2><p>سجّل بيانات نشاطك المحلي بخطوات بسيطة ومجانية.</p></div>
        <Link href="/register" className="button button-light">ابدأ التسجيل <ArrowLeft size={16} /></Link>
      </section>
    </main>
    <SiteFooter />
  </div>;
}

export function ContactPage() {
  return <div className="info-page" dir="rtl">
    <SiteHeader activePath="/contact" />
    <main>
      <section className="contact-intro page-width">
        <span className="eyebrow">نحن هنا للمساعدة</span>
        <h1>يسعدنا أن نسمع منك</h1>
        <p>هل لديك سؤال عن التسجيل أو تحتاج مساعدة في إدخال بيانات نشاطك؟ تواصل مع فريق أنس بالطريقة المناسبة لك.</p>
      </section>

      <section className="contact-options page-width">
        <article className="contact-card contact-whatsapp">
          <span className="contact-icon"><MessageCircle size={24} /></span>
          <span className="eyebrow">الطريقة الأسرع</span>
          <h2>راسلنا على واتساب</h2>
          <p>أرسل سؤالك لفريقنا، وسنساعدك في معرفة الخطوة التالية.</p>
          <a href="https://wa.me/201030609048" target="_blank" rel="noreferrer" className="button button-primary">ابدأ محادثة <ArrowLeft size={16} /></a>
          <a href="https://wa.me/201030609048" target="_blank" rel="noreferrer" className="contact-number" dir="ltr">01030609048</a>
        </article>
        <article className="contact-card">
          <span className="contact-icon"><Phone size={24} /></span>
          <span className="eyebrow">اتصال هاتفي</span>
          <h2>تحدّث مع فريق أنس</h2>
          <p>اتصل بنا إذا كنت تفضّل الحديث مباشرة أو تحتاج مساعدة أثناء التسجيل.</p>
          <a href="tel:+201030609048" className="button button-outline">اتصل الآن <Phone size={16} /></a>
          <a href="tel:+201030609048" className="contact-number" dir="ltr">01030609048</a>
        </article>
      </section>

      <section className="contact-note page-width">
        <ShieldCheck size={22} />
        <p>لا ترسل بيانات بنكية أو كلمات مرور. مشاركة بيانات نشاطك تكون فقط من خلال نموذج التسجيل الرسمي وبموافقتك.</p>
      </section>
      <section className="contact-register page-width">
        <div><h2>جاهز لتسجيل نشاطك؟</h2><p>ابدأ من النموذج، وإذا احتجت مساعدة نحن على بُعد رسالة.</p></div>
        <Link href="/register" className="button button-light">سجّل نشاطك <ArrowLeft size={16} /></Link>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
