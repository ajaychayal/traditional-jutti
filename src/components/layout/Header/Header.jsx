import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Heart, User, Search, Menu, X, Package, Settings, LogOut, LogIn, UserPlus } from 'lucide-react';
import clsx from 'clsx';
import { logout } from '../../../store/authSlice';
import Button from '../../ui/Button/Button';
import Badge from '../../ui/Badge/Badge';
import styles from './Header.module.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const theme = useSelector((state) => state.theme.theme);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={clsx('container', styles.headerContainer)}>
        {/* Mobile Menu Toggle */}
        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src="/images/header-logo.png" alt="JuttiStyle Logo" className={styles.logoImage} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={clsx(styles.nav, { [styles.navOpen]: isMobileMenuOpen })}>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/experience" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setIsMobileMenuOpen(false)}>Experience</NavLink></li>
            <li><NavLink to="/find-range" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setIsMobileMenuOpen(false)}>Find a Range</NavLink></li>

            <li>
              <Link
                to="/account"
                state={{ tab: 'orders' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Orders
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icons Section */}
        <div className={styles.iconActions}>
          <div className={clsx(styles.searchContainer, { [styles.searchOpen]: isSearchOpen })}>
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search juttis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
              </form>
            )}
            <Button variant="icon" className={styles.iconBtn} aria-label="Search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </Button>
          </div>

          <div className={styles.userDropdownContainer}>
            <Button
              variant="icon"
              aria-label="Account"
              className={styles.iconBtn}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <User size={20} />
            </Button>

            {isUserDropdownOpen && (
              <>
                <div className={styles.dropdownOverlay} onClick={() => setIsUserDropdownOpen(false)}></div>
                <div className={styles.userDropdown}>
                  {isAuthenticated ? (
                    <>
                      <div className={styles.dropdownHeader}>
                        <p className={styles.dropdownName}>{user?.name || 'User'}</p>
                        <p className={styles.dropdownEmail}>{user?.email}</p>
                      </div>
                      <div className={styles.dropdownLinks}>
                        <Link to="/account" state={{ tab: 'dashboard' }} onClick={() => setIsUserDropdownOpen(false)}>
                          <User size={16} /> Dashboard
                        </Link>
                        <Link to="/account" state={{ tab: 'orders' }} onClick={() => setIsUserDropdownOpen(false)}>
                          <Package size={16} /> My Orders
                        </Link>
                        <Link to="/account" state={{ tab: 'wishlist' }} onClick={() => setIsUserDropdownOpen(false)} className={styles.dropdownItemWithBadge}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}><Heart size={16} /> Wishlist</span>
                          {wishlistItems.length > 0 && <Badge variant="primary" size="sm" pill>{wishlistItems.length}</Badge>}
                        </Link>
                        <Link to="/account" state={{ tab: 'settings' }} onClick={() => setIsUserDropdownOpen(false)}>
                          <Settings size={16} /> Settings
                        </Link>

                        <button className={styles.logoutBtn} onClick={handleLogout}>
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.dropdownLinks}>
                      <Link to="/login" onClick={() => setIsUserDropdownOpen(false)}>
                        <LogIn size={16} /> Sign In
                      </Link>
                      <Link to="/register" onClick={() => setIsUserDropdownOpen(false)}>
                        <UserPlus size={16} /> Create Account
                      </Link>
                      <Link to="/account" state={{ tab: 'wishlist' }} onClick={() => setIsUserDropdownOpen(false)} className={styles.dropdownItemWithBadge}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}><Heart size={16} /> Wishlist</span>
                        {wishlistItems.length > 0 && <Badge variant="primary" size="sm" pill>{wishlistItems.length}</Badge>}
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <Link to="/cart" className={styles.iconLink} aria-label="Cart">
            <ShoppingCart size={20} style={{ color: 'var(--color-heading)', display: 'block', }} />
            {cartTotalQuantity > 0 && (
              <div className={styles.badgeWrapper}>
                <Badge variant="sale" size="sm" pill>{cartTotalQuantity}</Badge>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
