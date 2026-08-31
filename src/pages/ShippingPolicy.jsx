import styles from './InfoPages.module.scss';
import clsx from 'clsx';

export default function ShippingPolicy() {
  return (
    <div className={clsx('container', styles.infoContainer)}>
      <div className={styles.pageHeader}>
        <h1>Shipping Policy</h1>
        <p>Everything you need to know about our shipping and delivery processes.</p>
      </div>

      <div className={styles.section}>
        <h2>Processing Time</h2>
        <p>
          All our juttis are handcrafted with care. Orders are typically processed and dispatched 
          within 2-3 business days after receiving payment confirmation. Custom or personalized orders 
          may require up to 7-10 business days for processing.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Domestic Shipping (India)</h2>
        <ul>
          <li><strong>Standard Shipping:</strong> Free for all orders above ₹2000. Delivery in 3-5 business days.</li>
          <li><strong>Express Shipping:</strong> Available for ₹150. Delivery in 1-2 business days to metro cities.</li>
          <li><strong>Cash on Delivery (COD):</strong> Available at an additional flat charge of ₹99.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>International Shipping</h2>
        <p>
          We ship globally! International shipping charges are calculated at checkout based on 
          your location and the weight of your order. Delivery usually takes 7-14 business days.
        </p>
        <p>
          <em>Please note: International shipments may be subject to import taxes, customs duties, 
          and fees levied by the destination country. These charges are the buyer's responsibility.</em>
        </p>
      </div>

      <div className={styles.section}>
        <h2>Order Tracking</h2>
        <p>
          Once your order has been dispatched, you will receive an email with your tracking number 
          and a link to track your shipment online.
        </p>
      </div>
    </div>
  );
}
