import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, Share2, Truck, ShieldCheck, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import clsx from 'clsx';
import { products } from '../data/products';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import Button from '../components/ui/Button/Button';
import Badge from '../components/ui/Badge/Badge';
import ProductCard from '../components/product/ProductCard/ProductCard';
import styles from './ProductDetails.module.scss';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  
  // Modals state
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImage(0);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setDeliveryInfo(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Button variant="primary" onClick={() => navigate('/shop')} style={{ marginTop: '1rem' }}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      price: product.salePrice || product.price,
    }));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pinCode.length === 6) {
      setDeliveryInfo({
        available: true,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    } else {
      setDeliveryInfo({ available: false });
    }
  };

  return (
    <div className={styles.productPage}>
      <div className={clsx('container', styles.breadcrumb)}>
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
      </div>

      <div className={clsx('container', styles.mainSection)}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer} onClick={() => setIsZoomOpen(true)} style={{ cursor: 'zoom-in' }}>
            <img src={product.images[activeImage]} alt={product.name} className={styles.mainImage} fetchpriority="high" />
            <div className={styles.badges}>
              {product.badges.map(badge => (
                <Badge key={badge} variant={badge === 'sale' ? 'sale' : badge === 'new' ? 'new' : 'bestSeller'}>
                  {badge === 'sale' && discountPercent > 0 ? `-${discountPercent}%` : badge.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
          <div className={styles.thumbnailList}>
            {product.images.map((img, index) => (
              <button 
                key={index} 
                className={clsx(styles.thumbnail, { [styles.activeThumb]: activeImage === index })}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`${product.name} thumb ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.ratingRow}>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(product.rating) ? 'var(--color-warning)' : 'none'} 
                  color="var(--color-warning)" 
                />
              ))}
              <span>{product.rating}</span>
            </div>
            <a href="#reviews" className={styles.reviewsLink}>({product.reviews} reviews)</a>
            <span className={styles.divider}>|</span>
            <span className={styles.sku}>SKU: PJT-{product.id}</span>
          </div>
          
          <div className={styles.priceRow}>
            {product.salePrice ? (
              <>
                <span className={styles.salePrice}>₹{product.salePrice}</span>
                <span className={styles.originalPrice}>₹{product.price}</span>
                <Badge variant="sale" size="sm">Save {discountPercent}%</Badge>
              </>
            ) : (
              <span className={styles.price}>₹{product.price}</span>
            )}
          </div>
          
          <p className={styles.description}>{product.description}</p>
          
          <hr className={styles.separator} />
          
          {/* Color Selection */}
          <div className={styles.optionSection}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>Color</span>
              <span className={styles.optionValue}>{selectedColor}</span>
            </div>
            <div className={styles.colorOptions}>
              {product.colors.map(color => (
                <button
                  key={color}
                  className={clsx(styles.colorBtn, { [styles.activeColor]: selectedColor === color })}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                >
                  <span 
                    className={styles.colorSwatch} 
                    style={{ backgroundColor: color.toLowerCase() === 'multicolor' ? '#a855f7' : color.toLowerCase() }} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className={styles.optionSection}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>Size (EU)</span>
              <button className={styles.sizeGuideBtn} onClick={() => setIsSizeGuideOpen(true)}>Size Guide</button>
            </div>
            <div className={styles.sizeOptions}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={clsx(styles.sizeBtn, { [styles.activeSize]: selectedSize === size })}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity & Actions */}
          <div className={styles.actionSection}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            
            <Button 
              variant="primary" 
              size="lg" 
              className={styles.addToCartBtn} 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className={styles.wishlistBtn}
              onClick={handleWishlist}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </Button>
          </div>
          
          <Button variant="secondary" size="lg" fullWidth disabled={!product.inStock}>
            Buy it Now
          </Button>
          
          {/* Delivery Check */}
          <div className={styles.deliverySection}>
            <div className={styles.deliveryHeader}>
              <Truck size={20} />
              <h4>Delivery Information</h4>
            </div>
            <form onSubmit={checkDelivery} className={styles.pinForm}>
              <input 
                type="text" 
                placeholder="Enter PIN code" 
                value={pinCode} 
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                className={styles.pinInput}
              />
              <Button type="submit" variant="ghost">Check</Button>
            </form>
            {deliveryInfo && (
              <div className={clsx(styles.deliveryResult, { [styles.error]: !deliveryInfo.available })}>
                {deliveryInfo.available ? (
                  <p><Check size={16} /> Delivery by <strong>{deliveryInfo.date}</strong></p>
                ) : (
                  <p>Please enter a valid 6-digit PIN code.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={24} />
              <span>100% Secure Payment</span>
            </div>
            <div className={styles.trustBadge}>
              <Truck size={24} />
              <span>Free Shipping India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews" className={clsx('container', styles.reviewsSection)}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <div className={styles.reviewsGrid}>
          <div className={styles.reviewsSummary}>
            <div className={styles.averageRating}>
              <h2>{product.rating}</h2>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.floor(product.rating) ? 'var(--color-warning)' : 'none'} color="var(--color-warning)" />
                ))}
              </div>
              <p>Based on {product.reviews} reviews</p>
            </div>
            <Button variant="outline" fullWidth>Write a Review</Button>
          </div>
          <div className={styles.reviewsList}>
            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.avatar}>S</div>
                  <div>
                    <h4>Simran K.</h4>
                    <span className={styles.date}>August 15, 2026</span>
                  </div>
                </div>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--color-warning)" color="var(--color-warning)" />)}
                </div>
              </div>
              <p className={styles.reviewText}>Absolutely beautiful juttis! The embroidery is so detailed and they are incredibly comfortable even for long wear.</p>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.avatar}>A</div>
                  <div>
                    <h4>Aman P.</h4>
                    <span className={styles.date}>July 28, 2026</span>
                  </div>
                </div>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? 'var(--color-warning)' : 'none'} color="var(--color-warning)" />)}
                </div>
              </div>
              <p className={styles.reviewText}>Love the design but I had to exchange for a size bigger as they run slightly small for wider feet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsZoomOpen(false)}>
          <div className={styles.zoomModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setIsZoomOpen(false)}><X size={24} /></button>
            <img src={product.images[activeImage]} alt="Zoomed Product" className={styles.zoomedImage} loading="lazy" />
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSizeGuideOpen(false)}>
          <div className={styles.sizeModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Size Guide</h3>
              <button className={styles.closeModalBtn} onClick={() => setIsSizeGuideOpen(false)}><X size={24} /></button>
            </div>
            <div className={styles.modalBody}>
              <p>Measure your foot length and compare with our chart below to find your perfect fit.</p>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>EU Size</th>
                    <th>UK Size</th>
                    <th>Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>36</td><td>3</td><td>22.5</td></tr>
                  <tr><td>37</td><td>4</td><td>23.5</td></tr>
                  <tr><td>38</td><td>5</td><td>24.5</td></tr>
                  <tr><td>39</td><td>6</td><td>25.5</td></tr>
                  <tr><td>40</td><td>7</td><td>26.5</td></tr>
                  <tr><td>41</td><td>8</td><td>27.5</td></tr>
                </tbody>
              </table>
              <div className={styles.sizeTip}>
                <strong>Tip:</strong> Since juttis are made of pure leather, they will expand slightly and take the shape of your feet after a few wears. If you have a wider foot, we recommend sizing up.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={clsx('container', styles.relatedSection)}>
          <h2 className={styles.sectionTitle}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
