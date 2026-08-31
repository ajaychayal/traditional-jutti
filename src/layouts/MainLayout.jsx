import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

export default function MainLayout() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
