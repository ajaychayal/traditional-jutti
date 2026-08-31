import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { addToCart, removeFromCart, clearItemFromCart } from '../store/cartSlice';
import Button from '../components/ui/Button/Button';
import Badge from '../components/ui/Badge/Badge';
import styles from './Cart.module.scss';
import clsx from 'clsx';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState({ message: '', type: '' });
  
  const shipping = totalAmount > 2000 ? 0 : 99;
  const tax = Math.round(totalAmount * 0.05); // 5% fake tax
  const discount = couponState.type === 'success' ? 500 : 0; // Flat 500 discount if successful
  
  const finalTotal = totalAmount + shipping + tax - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'JUTTI500') {
      setCouponState({ message: 'Coupon applied successfully!', type: 'success' });
    } else {
      setCouponState({ message: 'Invalid coupon code', type: 'error' });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={clsx('container', styles.emptyCart)}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Button variant="primary" onClick={() => navigate('/shop')} className={styles.continueBtn}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className={styles.pageTitle}>Shopping Cart</h1>
        
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            <div className={styles.tableHeader}>
              <div className={styles.colProduct}>Product</div>
              <div className={styles.colQuantity}>Quantity</div>
              <div className={styles.colTotal}>Total</div>
              <div className={styles.colAction}></div>
            </div>
            
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}-${item.color}`} className={styles.cartItem}>
                <div className={styles.colProduct}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.images[0]} alt={item.name} className={styles.itemImage} loading="lazy" />
                  </Link>
                  <div className={styles.itemInfo}>
                    <Link to={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                    <div className={styles.itemMeta}>
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                    <div className={styles.itemPrice}>₹{item.price}</div>
                  </div>
                </div>
                
                <div className={styles.colQuantity}>
                  <div className={styles.quantitySelector}>
                    <button onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(addToCart(item))}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                <div className={styles.colTotal}>
                  <span className={styles.itemTotalPrice}>₹{item.totalPrice}</span>
                </div>
                
                <div className={styles.colAction}>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => dispatch(clearItemFromCart({ id: item.id, size: item.size, color: item.color }))}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className={styles.cartActions}>
              <Button variant="outline" onClick={() => navigate('/shop')}>Continue Shopping</Button>
            </div>
          </div>
          
          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping {shipping === 0 && <Badge variant="success" size="sm">Free</Badge>}</span>
              <span>{shipping === 0 ? '₹0' : `₹${shipping}`}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Estimated Tax</span>
              <span>₹{tax}</span>
            </div>
            
            {discount > 0 && (
              <div className={clsx(styles.summaryRow, styles.discountRow)}>
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            
            <div className={clsx(styles.summaryRow, styles.finalTotal)}>
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
            
            <div className={styles.couponSection}>
              <h4>Have a coupon?</h4>
              <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
                <input 
                  type="text" 
                  placeholder="Enter code (e.g. JUTTI500)" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={styles.couponInput}
                />
                <Button type="submit" variant="secondary">Apply</Button>
              </form>
              {couponState.message && (
                <p className={clsx(styles.couponMessage, styles[couponState.type])}>
                  {couponState.message}
                </p>
              )}
            </div>
            
            <Button 
              variant="primary" 
              fullWidth 
              size="lg" 
              className={styles.checkoutBtn}
              onClick={() => navigate('/checkout')}
              rightIcon={<ArrowRight size={18} />}
            >
              Proceed to Checkout
            </Button>
            
            <div className={styles.secureCheckout}>
              <p>Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
