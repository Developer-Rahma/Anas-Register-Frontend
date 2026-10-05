import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { LandingPage, RegistrationPage, ConfirmationPage } from '@/features/registration/RegistrationPage';
import { RecordsPage } from '@/features/records/RecordsPage';
import { Modal } from '@/shared/Modal';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/confirmation" component={ConfirmationPage} />
        <Route path="/admin" component={RecordsPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function Home() {
  return <LandingPage />;
}

function PrivacyNotice() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-privacy', show);
    return () => window.removeEventListener('open-privacy', show);
  }, []);
  return open ? <Modal title="الخصوصية واستخدام البيانات" onClose={() => setOpen(false)}>
    <p>نستخدم بياناتك للحصر ودراسة الاحتياجات والمتابعة وفق اختياراتك. لا ننشر بياناتك أو وسائل تواصلك تلقائيًا. يمكنك طلب تعديل بياناتك أو حذفها بالتواصل معنا.</p>
    <a className="button button-outline full-width" href="https://wa.me/201030609048">طلب تعديل أو حذف البيانات</a>
  </Modal> : null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <PrivacyNotice />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
