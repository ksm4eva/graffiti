import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from '@/contexts/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import ArtworkDetail from '@/pages/ArtworkDetail';
import ArtistProfile from '@/pages/ArtistProfile';
import AuthPage from '@/pages/AuthPage';
import UserDashboard from '@/pages/UserDashboard';
import ArtistDashboard from '@/pages/ArtistDashboard';
import AdminDashboard from '@/pages/AdminDashboard';

function Routes() {
  const { route } = useApp();

  let page: React.ReactNode;
  let showFooter = true;
  switch (route.name) {
    case 'home':
      page = <HomePage />;
      break;
    case 'about':
      page = <AboutPage />;
      break;
    case 'gallery':
      page = <GalleryPage />;
      break;
    case 'contact':
      page = <ContactPage />;
      break;
    case 'artwork':
      page = <ArtworkDetail id={route.id} />;
      break;
    case 'artist':
      page = <ArtistProfile id={route.id} />;
      break;
    case 'auth':
      page = <AuthPage mode={route.mode} />;
      showFooter = false;
      break;
    case 'user-dashboard':
      page = <UserDashboard />;
      break;
    case 'artist-dashboard':
      page = <ArtistDashboard />;
      break;
    case 'admin-dashboard':
      page = <AdminDashboard />;
      break;
    default:
      page = <HomePage />;
  }

  const routeKey =
    route.name +
    ('id' in route ? route.id : '') +
    ('mode' in route ? route.mode : '');

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={routeKey}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
      {showFooter && <Footer />}
    </>
  );
}

function Shell() {
  const { route } = useApp();
  const hideNav = route.name === 'auth';
  return (
    <div className="min-h-screen bg-white">
      {!hideNav && <Navbar />}
      <Routes />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
