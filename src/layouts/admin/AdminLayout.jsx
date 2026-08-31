import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import styles from './AdminLayout.module.scss';

export default function AdminLayout() {
  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.backLink} title="Back to Store">
            <ArrowLeft size={20} />
          </Link>
          <h2>Admin Panel</h2>
        </div>
        
        <nav className={styles.navMenu}>
          <NavLink to="/admin" end className={({isActive}) => isActive ? styles.active : ''}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({isActive}) => isActive ? styles.active : ''}>
            <Package size={20} /> Products
          </NavLink>
          <a href="#" className={styles.disabledLink}>
            <ShoppingBag size={20} /> Orders
          </a>
          <a href="#" className={styles.disabledLink}>
            <Users size={20} /> Customers
          </a>
          <a href="#" className={styles.disabledLink}>
            <Settings size={20} /> Settings
          </a>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.logoutBtn}>
            <LogOut size={20} /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.adminProfile}>
              <div className={styles.avatar}>A</div>
              <span>Admin User</span>
            </div>
          </div>
        </header>
        
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
