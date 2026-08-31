import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, Package, User, Heart, Settings, Navigation, Bell, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { logout, updateUser } from '../store/authSlice';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button/Button';
import Badge from '../components/ui/Badge/Badge';
import ProductCard from '../components/product/ProductCard/ProductCard';
import styles from './Account.module.scss';
import clsx from 'clsx';

export default function Account() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.order.orders);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  // Password Change State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordState, setPasswordState] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  
  // Logout Modal State
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e) => {
    setPasswordState({ ...passwordState, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    if (!passwordState.current || !passwordState.new || !passwordState.confirm) {
      toast.error('Please fill in all password fields.');
      return;
    }
    if (passwordState.new !== passwordState.confirm) {
      toast.error('New passwords do not match.');
      return;
    }
    if (passwordState.new.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    
    // Mock save
    toast.success('Password updated successfully!');
    setIsChangingPassword(false);
    setPasswordState({ current: '', new: '', confirm: '' });
  };

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
      // Clear state so refresh doesn't stick to tab
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSaveProfile = () => {
    dispatch(updateUser({ name: profileName, email: profileEmail }));
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return <Badge variant="success">{status}</Badge>;
      case 'Processing': return <Badge variant="warning">{status}</Badge>;
      case 'Shipped': return <Badge variant="info">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={styles.accountPage}>
      <div className={clsx('container', styles.accountContainer)}>
        <aside className={styles.sidebar}>
          <div className={styles.profileSummary}>
            <div className={styles.avatar}>{user?.name?.charAt(0) || 'U'}</div>
            <div>
              <h3>{user?.name || 'User'}</h3>
              <p>{user?.email}</p>
            </div>
          </div>
          
          <nav className={styles.navMenu}>
            <button 
              className={clsx(styles.navItem, { [styles.active]: activeTab === 'dashboard' })}
              onClick={() => setActiveTab('dashboard')}
            >
              <User size={18} /> Dashboard
            </button>
            <button 
              className={clsx(styles.navItem, { [styles.active]: activeTab === 'orders' })}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={18} /> My Orders
            </button>
            <button 
              className={clsx(styles.navItem, { [styles.active]: activeTab === 'wishlist' })}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={18} /> Wishlist
            </button>
            <button 
              className={clsx(styles.navItem, { [styles.active]: activeTab === 'settings' })}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} /> Settings
            </button>
            <button className={styles.navItem} onClick={() => setShowLogoutModal(true)}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        <main className={styles.content}>
          <h1 className={styles.pageTitle}>
            {activeTab === 'dashboard' && 'My Dashboard'}
            {activeTab === 'orders' && 'My Orders'}
            {activeTab === 'wishlist' && 'My Wishlist'}
            {activeTab === 'settings' && 'Account Settings'}
          </h1>
          
          {activeTab === 'dashboard' && (
            <>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><Package size={24} /></div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{orders.length}</span>
                    <span className={styles.statLabel}>Total Orders</span>
                  </div>
                </div>
                <div className={styles.statCard} onClick={() => setActiveTab('wishlist')} style={{ cursor: 'pointer' }}>
                  <div className={styles.statIcon}><Heart size={24} /></div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{wishlistItems.length}</span>
                    <span className={styles.statLabel}>Wishlist Items</span>
                  </div>
                </div>
              </div>

              <div className={styles.recentOrders}>
                <div className={styles.sectionHeader}>
                  <h2>Recent Orders</h2>
                  <Button variant="link" onClick={() => setActiveTab('orders')}>View All</Button>
                </div>
                
                <div className={styles.orderList}>
                  {orders.length === 0 ? (
                    <div className={styles.emptyState}>
                      <Package size={48} className={styles.emptyIcon} />
                      <p>You haven't placed any orders yet.</p>
                      <Link to="/shop">
                        <Button variant="outline">Start Shopping</Button>
                      </Link>
                    </div>
                  ) : (
                    orders.slice(0, 2).map(order => (
                      <div key={order.orderId} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                          <div>
                            <span className={styles.orderId}>{order.orderId}</span>
                            <span className={styles.orderDate}>Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className={styles.orderDetails}>
                          <div className={styles.orderItem}>
                            <img src={order.items[0]?.images[0] || 'https://placehold.co/800x1000/f8e8ed/8b1e3f?text=Jutti'} alt="Jutti" loading="lazy" />
                            <div>
                              <p className={styles.itemName}>{order.items[0]?.name || 'Product Name'}</p>
                              {order.items.length > 1 && (
                                <p className={styles.itemMeta}>+ {order.items.length - 1} more items</p>
                              )}
                              <p className={styles.itemMeta}>Total: ₹{order.total}</p>
                            </div>
                          </div>
                          <div className={styles.orderActions}>
                            <Link to={`/account/tracking/${order.orderId}`}>
                              <Button variant="outline" size="sm">
                                <Navigation size={14} style={{ marginRight: '6px' }} /> Track Order
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className={styles.orderList}>
              {orders.length === 0 ? (
                <div className={styles.emptyState}>
                  <Package size={48} className={styles.emptyIcon} />
                  <p>You haven't placed any orders yet.</p>
                  <Link to="/shop">
                    <Button variant="primary">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.orderId} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>{order.orderId}</span>
                        <span className={styles.orderDate}>Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className={styles.orderItemsWrapper}>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.orderItem}>
                          <img src={item.images?.[0] || 'https://placehold.co/800x1000/f8e8ed/8b1e3f?text=Jutti'} alt={item.name} loading="lazy" />
                          <div>
                            <p className={styles.itemName}>{item.name}</p>
                            <p className={styles.itemMeta}>Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                            <p className={styles.itemPrice}>₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.orderFooter}>
                      <div className={styles.orderTotal}>
                        <span>Order Total:</span>
                        <strong>₹{order.total}</strong>
                      </div>
                      <div className={styles.orderActions}>
                        <Link to={`/account/tracking/${order.orderId}`}>
                          <Button variant="primary" size="sm">
                            <Navigation size={14} style={{ marginRight: '6px' }} /> Track Order
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              {wishlistItems.length === 0 ? (
                <div className={styles.emptyState}>
                  <Heart size={48} className={styles.emptyIcon} />
                  <p>Your wishlist is waiting for something special.</p>
                  <Link to="/shop">
                    <Button variant="primary">Explore Collection</Button>
                  </Link>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 'var(--space-6)'
                }}>
                  {wishlistItems.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={styles.settingsLayout}>
              
              <div className={styles.settingsSection}>
                <div className={styles.settingsHeader}>
                  <User size={20} />
                  <h2>Profile Details</h2>
                </div>
                <div className={styles.settingsContent}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      readOnly={!isEditingProfile} 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      className={styles.input} 
                      value={profileEmail} 
                      onChange={(e) => setProfileEmail(e.target.value)}
                      readOnly={!isEditingProfile} 
                    />
                  </div>
                  {isEditingProfile ? (
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                      <Button variant="primary" size="sm" onClick={handleSaveProfile}>Save Changes</Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        setIsEditingProfile(false);
                        setProfileName(user?.name || '');
                        setProfileEmail(user?.email || '');
                      }}>Cancel</Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
                  )}
                </div>
              </div>

              <div className={styles.settingsSection}>
                <div className={styles.settingsHeader}>
                  <Lock size={20} />
                  <h2>Security</h2>
                </div>
                <div className={styles.settingsContent}>
                  {isChangingPassword ? (
                    <div className={styles.passwordForm}>
                      <div className={styles.formGroup}>
                        <label>Current Password</label>
                        <div className={styles.passwordInputWrapper}>
                          <input 
                            type={showPassword.current ? "text" : "password"} 
                            name="current"
                            className={styles.input} 
                            value={passwordState.current}
                            onChange={handlePasswordChange}
                          />
                          <button 
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => togglePasswordVisibility('current')}
                          >
                            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label>New Password</label>
                        <div className={styles.passwordInputWrapper}>
                          <input 
                            type={showPassword.new ? "text" : "password"} 
                            name="new"
                            className={styles.input} 
                            value={passwordState.new}
                            onChange={handlePasswordChange}
                          />
                          <button 
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => togglePasswordVisibility('new')}
                          >
                            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Confirm New Password</label>
                        <div className={styles.passwordInputWrapper}>
                          <input 
                            type={showPassword.confirm ? "text" : "password"} 
                            name="confirm"
                            className={styles.input} 
                            value={passwordState.confirm}
                            onChange={handlePasswordChange}
                          />
                          <button 
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => togglePasswordVisibility('confirm')}
                          >
                            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                        <Button variant="primary" size="sm" onClick={handleSavePassword}>Update Password</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordState({ current: '', new: '', confirm: '' });
                        }}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={styles.helpText}>Update your password to keep your account secure.</p>
                      <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(true)}>Change Password</Button>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.settingsSection}>
                <div className={styles.settingsHeader}>
                  <Bell size={20} />
                  <h2>Notifications</h2>
                </div>
                <div className={styles.settingsContent}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" defaultChecked />
                    <span>Order Updates (Email & SMS)</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" defaultChecked />
                    <span>Promotional Offers & Newsletters</span>
                  </label>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out of your account?</p>
            <div className={styles.modalActions}>
              <Button variant="outline" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleLogout}>Yes, Log Out</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
