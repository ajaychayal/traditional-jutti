import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Navigation } from 'lucide-react';
import Button from '../components/ui/Button/Button';
import styles from './OrderSuccess.module.scss';

export default function OrderSuccess() {
  const location = useLocation();
  const orderDetails = location.state;

  // If user accesses this page directly without completing an order
  if (!orderDetails) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className={styles.successPage}>
      <div className="container">
        <div className={styles.successCard}>
          <div className={styles.iconWrapper}>
            <CheckCircle size={64} className={styles.successIcon} />
          </div>
          
          <h1 className={styles.title}>Order Placed Successfully!</h1>
          <p className={styles.subtitle}>Thank you for your purchase.</p>
          
          <div className={styles.orderBox}>
            <div className={styles.orderDetailRow}>
              <span>Order Number</span>
              <strong>{orderDetails.orderId}</strong>
            </div>
            <div className={styles.orderDetailRow}>
              <span>Date</span>
              <strong>{new Date().toLocaleDateString('en-IN')}</strong>
            </div>
            <div className={styles.orderDetailRow}>
              <span>Total Amount</span>
              <strong>₹{orderDetails.total}</strong>
            </div>
            <div className={styles.orderDetailRow}>
              <span>Payment Method</span>
              <strong>{orderDetails.paymentMethod.toUpperCase()}</strong>
            </div>
          </div>

          <div className={styles.shippingBox}>
            <h3>Shipping Information</h3>
            <p><strong>Name:</strong> {orderDetails.shippingAddress.name}</p>
            <p><strong>Email:</strong> {orderDetails.email}</p>
            <p><strong>Phone:</strong> {orderDetails.shippingAddress.phone}</p>
            <p><strong>Address:</strong> {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pinCode}</p>
          </div>
          
          <p className={styles.confirmationMsg}>
            We've sent a confirmation email with order details and a tracking link.
          </p>
          
          <div className={styles.nextSteps}>
            <div className={styles.step}>
              <Package size={24} />
              <span>We're preparing your order</span>
            </div>
            <div className={styles.stepLine} />
            <div className={styles.step}>
              <Truck size={24} />
              <span>Expected Delivery in 3-5 days</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <Link to="/account" state={{ tab: 'dashboard' }}>
              <Button variant="primary" size="lg" style={{ width: '100%' }}>
                Go to Dashboard
              </Button>
            </Link>
            
            <Link to={`/account/tracking/${orderDetails.orderId}`}>
              <Button variant="outline" size="lg" style={{ width: '100%' }}>
                <Navigation size={18} style={{ marginRight: '8px' }} /> Track Order
              </Button>
            </Link>
          </div>
          
          <div className={styles.quickLinks}>
            <h3>Quick Links</h3>
            <div className={styles.quickLinksList}>
              <Link to="/account" state={{ tab: 'orders' }}>
                <Button variant="outline" size="sm">My Orders</Button>
              </Link>
              <Link to="/account" state={{ tab: 'wishlist' }}>
                <Button variant="outline" size="sm">Wishlist</Button>
              </Link>
              <Link to="/account" state={{ tab: 'settings' }}>
                <Button variant="outline" size="sm">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
