import styles from './InfoPages.module.scss';
import clsx from 'clsx';

export default function ReturnPolicy() {
  return (
    <div className={clsx('container', styles.infoContainer)}>
      <div className={styles.pageHeader}>
        <h1>Returns & Exchanges</h1>
        <p>Our commitment to your satisfaction and our return guidelines.</p>
      </div>

      <div className={styles.section}>
        <h2>Our Policy</h2>
        <p>
          We want you to love your juttis! If the fit isn't quite right, we offer a <strong>7-day exchange policy</strong> 
          from the date of delivery. Because our items are handcrafted, we only offer returns/refunds for defective or damaged items.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Exchange Guidelines</h2>
        <ul>
          <li>The request must be raised within 7 days of receiving the product.</li>
          <li>Juttis must be completely unworn and in their original condition. We recommend trying them on a carpeted surface.</li>
          <li>All original tags, packaging, and the muslin cloth bag must be intact and included.</li>
          <li>Custom or personalized orders cannot be exchanged or returned.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How to initiate an Exchange</h2>
        <p>
          To initiate an exchange, please email us at <strong>support@punjabijutti.com</strong> with your 
          order number and the reason for exchange. Our team will get back to you within 24 hours with 
          instructions on where to send the package.
        </p>
        <p>
          <em>Note: The cost of return shipping for size exchanges is to be borne by the customer.</em>
        </p>
      </div>

      <div className={styles.section}>
        <h2>Damaged or Defective Items</h2>
        <p>
          In the rare event that you receive a defective item, please contact us within 48 hours of 
          delivery with clear photographs of the defect. We will arrange for a free return pickup 
          and dispatch a replacement immediately, or process a full refund to your original payment method.
        </p>
      </div>
    </div>
  );
}
