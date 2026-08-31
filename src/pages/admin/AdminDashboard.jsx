import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import styles from './AdminDashboard.module.scss';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, trend: '+12%' },
    { title: 'Orders', value: '145', icon: ShoppingBag, trend: '+5%' },
    { title: 'Customers', value: '1,204', icon: Users, trend: '+18%' },
    { title: 'Conversion Rate', value: '3.2%', icon: TrendingUp, trend: '+1.2%' }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon size={24} />
              </div>
              <div className={styles.statInfo}>
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
                <span className={styles.trend}>{stat.trend} from last month</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.recentOrders}>
        <h3>Recent Orders</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#JUTTI-49201</td>
              <td>Simran Kaur</td>
              <td>Today, 2:30 PM</td>
              <td>₹2,499</td>
              <td><span className={styles.statusProcessing}>Processing</span></td>
            </tr>
            <tr>
              <td>#JUTTI-49200</td>
              <td>Rahul Sharma</td>
              <td>Today, 10:15 AM</td>
              <td>₹1,899</td>
              <td><span className={styles.statusShipped}>Shipped</span></td>
            </tr>
            <tr>
              <td>#JUTTI-49199</td>
              <td>Priya Patel</td>
              <td>Yesterday</td>
              <td>₹3,598</td>
              <td><span className={styles.statusDelivered}>Delivered</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
