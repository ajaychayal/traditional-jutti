import { Link } from 'react-router-dom';
import { Camera, MessageCircle, Globe, Mail, Phone, MapPin } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../ui/Button/Button';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={clsx('container', styles.footerContainer)}>
        <div className={styles.footerGrid}>
          {/* Brand Info */}
          <div className={styles.footerCol}>
            <Link to="/" className={styles.logo}>
              <img src="/images/footer-logo.png" alt="JuttiStyle Logo" className={styles.logoImage} />
            </Link>
            <p className={styles.description}>
              Step into tradition with our handcrafted Punjabi Juttis. Made for modern style, built with heritage craftsmanship.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Instagram"><Camera size={20} /></a>
              <a href="#" aria-label="Facebook"><MessageCircle size={20} /></a>
              <a href="#" aria-label="Website"><Globe size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><Link to="/shop?category=womens">Women's Jutti</Link></li>
              <li><Link to="/shop?category=mens">Men's Jutti</Link></li>
              <li><Link to="/shop?category=bridal">Bridal Collection</Link></li>
              <li><Link to="/shop?collection=new-arrivals">New Arrivals</Link></li>
              <li><Link to="/shop?collection=best-sellers">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Customer Service</h4>
            <ul className={styles.linkList}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/returns">Return & Refund Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Stay in the Loop</h4>
            <p className={styles.newsletterText}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className={styles.input} required />
              <Button type="submit" variant="primary" fullWidth>Subscribe</Button>
            </form>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} JuttiStyle. All rights reserved.</p>
          <div className={styles.paymentMethods}>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
