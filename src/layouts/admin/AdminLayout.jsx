import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useUser, useClerk } from '@clerk/react';
import styles from './AdminLayout.module.scss';

export default function AdminLayout() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut();
    navigate('/');
  };
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
          <NavLink to="/admin/users" className={({isActive}) => isActive ? styles.active : ''}>
            <Users size={20} /> Users
          </NavLink>
          <a href="#" className={styles.disabledLink}>
            <Settings size={20} /> Settings
          </a>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn} style={{ background: 'transparent', border: 'none', width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <LogOut size={20} /> Exit Admin
          </button>
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
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={user.fullName || 'Admin'} className={styles.avatar} style={{ objectFit: 'cover' }} />
              ) : (
                <div className={styles.avatar}>{user?.firstName?.charAt(0) || 'A'}</div>
              )}
              <span>{user?.fullName || 'Admin User'}</span>
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
