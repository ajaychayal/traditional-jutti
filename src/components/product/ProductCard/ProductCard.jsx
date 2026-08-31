import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { toggleWishlist } from '../../../store/wishlistSlice';
import { addToCart } from '../../../store/cartSlice';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import clsx from 'clsx';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Defaulting to first size/color for quick add
    dispatch(addToCart({
      ...product,
      size: product.sizes[0],
      color: product.colors[0],
    }));
  };

  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
          alt={product.name} 
          className={styles.image}
          loading="lazy"
        />
        
        <div className={styles.badges}>
          {product.badges.map(badge => (
            <Badge 
              key={badge} 
              variant={badge === 'sale' ? 'sale' : badge === 'new' ? 'new' : 'bestSeller'}
              className={styles.badge}
            >
              {badge === 'sale' && discountPercent > 0 ? `-${discountPercent}%` : badge.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </Badge>
          ))}
          {!product.inStock && (
            <Badge variant="neutral">OUT OF STOCK</Badge>
          )}
        </div>

        <button 
          className={clsx(styles.wishlistBtn, { [styles.wishlisted]: isWishlisted })}
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <div className={styles.quickActions}>
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            leftIcon={<ShoppingBag size={18} />}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.rating}>
          <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
          <span>{product.rating}</span>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>
        
        <h3 className={styles.title}>{product.name}</h3>
        
        <div className={styles.priceContainer}>
          {product.salePrice ? (
            <>
              <span className={styles.salePrice}>₹{product.salePrice}</span>
              <span className={styles.originalPrice}>₹{product.price}</span>
            </>
          ) : (
            <span className={styles.price}>₹{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
