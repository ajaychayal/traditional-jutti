import { useParams, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Truck, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import Button from '../components/ui/Button/Button';
import styles from './OrderTracking.module.scss';
import clsx from 'clsx';

export default function OrderTracking() {
  const { orderId } = useParams();
  const orders = useSelector(state => state.order.orders);
  
  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return <Navigate to="/account" replace />;
  }

  const statuses = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statuses.indexOf(order.status);
  
  // Create mock timestamps for the timeline based on order date
  const orderDate = new Date(order.date);
  
  const timeline = [
    {
      status: 'Placed',
      description: 'We have received your order',
      date: orderDate,
      icon: <Package size={20} />,
      completed: currentStatusIndex >= 0
    },
    {
      status: 'Processing',
      description: 'Your order is being prepared and packed',
      date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000), // +1 day
      icon: <Clock size={20} />,
      completed: currentStatusIndex >= 1
    },
    {
      status: 'Shipped',
      description: 'Your order has been handed over to our courier partner',
      date: new Date(orderDate.getTime() + 48 * 60 * 60 * 1000), // +2 days
      icon: <Truck size={20} />,
      completed: currentStatusIndex >= 2
    },
    {
      status: 'Out for Delivery',
      description: 'Your order is out for delivery',
      date: new Date(orderDate.getTime() + 72 * 60 * 60 * 1000), // +3 days
      icon: <Truck size={20} />,
      completed: currentStatusIndex >= 3
    },
    {
      status: 'Delivered',
      description: 'Your order has been delivered successfully',
      date: new Date(orderDate.getTime() + 96 * 60 * 60 * 1000), // +4 days
      icon: <CheckCircle size={20} />,
      completed: currentStatusIndex >= 4
    }
  ];

  return (
    <div className={styles.trackingPage}>
      <div className={clsx('container', styles.container)}>
        
        <div className={styles.header}>
          <Link to="/account" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to My Orders
          </Link>
          <h1 className={styles.title}>Track Order</h1>
        </div>

        <div className={styles.trackingLayout}>
          
          <div className={styles.timelineSection}>
            <div className={styles.timelineCard}>
              <div className={styles.orderSummaryHeader}>
                <div>
                  <span className={styles.label}>Order ID</span>
                  <strong className={styles.value}>{order.orderId}</strong>
                </div>
                <div>
                  <span className={styles.label}>Estimated Delivery</span>
                  <strong className={styles.value}>
                    {new Date(orderDate.getTime() + 96 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </strong>
                </div>
              </div>

              <div className={styles.timeline}>
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className={clsx(styles.timelineItem, {
                      [styles.completed]: item.completed,
                      [styles.current]: index === currentStatusIndex,
                      [styles.pending]: !item.completed && index !== currentStatusIndex
                    })}
                  >
                    <div className={styles.nodeWrapper}>
                      <div className={styles.node}>{item.icon}</div>
                      {index < timeline.length - 1 && <div className={styles.line} />}
                    </div>
                    
                    <div className={styles.content}>
                      <div className={styles.statusHeader}>
                        <h3 className={styles.statusTitle}>{item.status}</h3>
                        {item.completed && (
                          <span className={styles.statusDate}>
                            {item.date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <p className={styles.statusDesc}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.detailsCard}>
              <h3>Shipping Details</h3>
              <div className={styles.addressBox}>
                <p><strong>{order.shippingAddress.name}</strong></p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className={styles.detailsCard}>
              <h3>Order Summary</h3>
              <div className={styles.orderItems}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.itemRow}>
                    <img src={item.images?.[0]} alt={item.name} loading="lazy" />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemMeta}>Qty: {item.quantity} | Size: {item.size}</p>
                    </div>
                    <div className={styles.itemPrice}>₹{item.price}</div>
                  </div>
                ))}
              </div>
              <div className={styles.totalRow}>
                <span>Total Paid</span>
                <strong>₹{order.total}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
