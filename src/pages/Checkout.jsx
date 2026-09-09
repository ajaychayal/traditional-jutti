import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm as useHookForm } from 'react-hook-form';
import clsx from 'clsx';
import { clearCart } from '../store/cartSlice';
import { placeOrder } from '../store/orderSlice';
import Button from '../components/ui/Button/Button';
import Badge from '../components/ui/Badge/Badge';
import { loadRazorpay } from '../utils/loadRazorpay';
import styles from './Checkout.module.scss';
import { toast } from 'react-toastify';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, trigger } = useHookForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pinCode: '',
      phone: ''
    }
  });

  const shipping = totalAmount > 2000 ? 0 : 99;
  const tax = Math.round(totalAmount * 0.05);
  const finalTotal = totalAmount + shipping + tax;

  const nextStep = async (currentStep) => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await trigger(['email', 'firstName', 'lastName', 'phone']);
    } else if (currentStep === 2) {
      isValid = await trigger(['address', 'city', 'state', 'pinCode']);
    }
    
    if (isValid) {
      setStep(currentStep + 1);
    }
  };

  const handlePayment = async (data) => {
    setIsProcessing(true);
    
    if (paymentMethod === 'cod') {
      const orderData = {
        orderId: `JUTTI-COD-${Math.floor(10000 + Math.random() * 90000)}`,
        total: finalTotal,
        paymentMethod: 'cod',
        email: data.email,
        items: cartItems,
        shippingAddress: data
      };
      dispatch(placeOrder(orderData));
      dispatch(clearCart());
      navigate('/order-success', { state: orderData });
      setIsProcessing(false);
      return;
    }

    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      // Create a new order on backend
      const result = await fetch('http://localhost:3001/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalTotal, currency: 'INR' })
      });
      
      if (!result.ok) {
        toast.error('Server error. Could not generate payment order.');
        setIsProcessing(false);
        return;
      }

      const orderData = await result.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key', 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Punjabi Jutti",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async function (response) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verifyRes = await fetch('http://localhost:3001/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verifyData)
          });
          
          const verifyResult = await verifyRes.json();
          if (verifyResult.success) {
            toast.success('Payment successful!');
            const newOrder = {
              orderId: response.razorpay_order_id,
              total: finalTotal,
              paymentMethod: 'razorpay',
              email: data.email,
              items: cartItems,
              shippingAddress: data
            };
            dispatch(placeOrder(newOrder));
            dispatch(clearCart());
            navigate('/order-success', { state: newOrder });
          } else {
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#8b1e3f",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast.error('An error occurred during payment setup.');
    } finally {
      setIsProcessing(false);
    }
  };


  if (cartItems.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <h1 className={styles.pageTitle}>Checkout</h1>
        
        <div className={styles.checkoutLayout}>
          <div className={styles.checkoutForm}>
            
            {/* Progress Indicator */}
            <div className={styles.progressTracker}>
              <div className={clsx(styles.step, { [styles.active]: step >= 1, [styles.completed]: step > 1 })}>
                <div className={styles.stepCircle}>1</div>
                <span>Contact</span>
              </div>
              <div className={styles.stepDivider} />
              <div className={clsx(styles.step, { [styles.active]: step >= 2, [styles.completed]: step > 2 })}>
                <div className={styles.stepCircle}>2</div>
                <span>Shipping</span>
              </div>
              <div className={styles.stepDivider} />
              <div className={clsx(styles.step, { [styles.active]: step >= 3 })}>
                <div className={styles.stepCircle}>3</div>
                <span>Payment</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(handlePayment)}>
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className={styles.formSection}>
                  <h2>Contact Information</h2>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      className={clsx(styles.input, { [styles.inputError]: errors.email })}
                      {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name</label>
                      <input 
                        id="firstName" 
                        type="text" 
                        className={clsx(styles.input, { [styles.inputError]: errors.firstName })}
                        {...register("firstName", { required: "First name is required" })}
                      />
                      {errors.firstName && <span className={styles.errorMsg}>{errors.firstName.message}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Last Name</label>
                      <input 
                        id="lastName" 
                        type="text" 
                        className={clsx(styles.input, { [styles.inputError]: errors.lastName })}
                        {...register("lastName", { required: "Last name is required" })}
                      />
                      {errors.lastName && <span className={styles.errorMsg}>{errors.lastName.message}</span>}
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      className={clsx(styles.input, { [styles.inputError]: errors.phone })}
                      {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid 10-digit phone number" } })}
                    />
                    {errors.phone && <span className={styles.errorMsg}>{errors.phone.message}</span>}
                  </div>
                  
                  <div className={styles.formActions}>
                    <Button variant="outline" onClick={() => navigate('/cart')}>Back to Cart</Button>
                    <Button variant="primary" type="button" onClick={() => nextStep(1)}>Continue to Shipping</Button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {step === 2 && (
                <div className={styles.formSection}>
                  <h2>Shipping Address</h2>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Address (House No, Building, Street, Area)</label>
                    <input 
                      id="address" 
                      type="text" 
                      className={clsx(styles.input, { [styles.inputError]: errors.address })}
                      {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && <span className={styles.errorMsg}>{errors.address.message}</span>}
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city">City</label>
                      <input 
                        id="city" 
                        type="text" 
                        className={clsx(styles.input, { [styles.inputError]: errors.city })}
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && <span className={styles.errorMsg}>{errors.city.message}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="state">State</label>
                      <select 
                        id="state" 
                        className={clsx(styles.input, { [styles.inputError]: errors.state })}
                        {...register("state", { required: "State is required" })}
                      >
                        <option value="">Select State</option>
                        <option value="PB">Punjab</option>
                        <option value="DL">Delhi</option>
                        <option value="MH">Maharashtra</option>
                        <option value="KA">Karnataka</option>
                        <option value="TN">Tamil Nadu</option>
                      </select>
                      {errors.state && <span className={styles.errorMsg}>{errors.state.message}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="pinCode">PIN Code</label>
                      <input 
                        id="pinCode" 
                        type="text" 
                        className={clsx(styles.input, { [styles.inputError]: errors.pinCode })}
                        {...register("pinCode", { required: "PIN code is required", pattern: { value: /^[0-9]{6}$/, message: "Invalid 6-digit PIN" } })}
                      />
                      {errors.pinCode && <span className={styles.errorMsg}>{errors.pinCode.message}</span>}
                    </div>
                  </div>
                  
                  <div className={styles.formActions}>
                    <Button variant="outline" type="button" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="primary" type="button" onClick={() => nextStep(2)}>Continue to Payment</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className={styles.formSection}>
                  <h2>Payment Method</h2>
                  
                  <div className={styles.paymentMethods}>
                    <label className={clsx(styles.paymentOption, { [styles.selected]: paymentMethod === 'upi' })}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="upi" 
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <span>UPI / QR</span>
                    </label>
                    <label className={clsx(styles.paymentOption, { [styles.selected]: paymentMethod === 'card' })}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <span>Credit / Debit Card</span>
                    </label>
                    <label className={clsx(styles.paymentOption, { [styles.selected]: paymentMethod === 'cod' })}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className={styles.cardDetails}>
                      <div className={styles.formGroup}>
                        <label>Card Number</label>
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className={styles.input} />
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                          <label>CVV</label>
                          <input type="password" placeholder="XXX" className={styles.input} />
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Name on Card</label>
                        <input type="text" placeholder="Full Name" className={styles.input} />
                      </div>
                    </div>
                  )}

                  <div className={styles.formActions}>
                    <Button variant="outline" type="button" onClick={() => setStep(2)}>Back</Button>
                    <Button variant="primary" type="submit" loading={isProcessing}>Pay ₹{finalTotal}</Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className={styles.orderSummary}>
            <h3>In Your Cart</h3>
            
            <div className={styles.cartItemsMini}>
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} className={styles.cartItemMini}>
                  <img src={item.images[0]} alt={item.name} className={styles.itemImageMini} loading="lazy" />
                  <div className={styles.itemInfoMini}>
                    <p className={styles.itemNameMini}>{item.name}</p>
                    <p className={styles.itemMetaMini}>{item.size} | {item.color} | Qty: {item.quantity}</p>
                  </div>
                  <div className={styles.itemPriceMini}>₹{item.totalPrice}</div>
                </div>
              ))}
            </div>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>
            <div className={clsx(styles.summaryRow, styles.finalTotal)}>
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
