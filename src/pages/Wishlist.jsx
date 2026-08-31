import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard/ProductCard';
import Button from '../components/ui/Button/Button';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        textAlign: 'center',
        gap: '1rem'
      }}>
        <Heart size={64} color="var(--color-text-muted)" strokeWidth={1} />
        <h2 style={{ margin: 0 }}>Your wishlist is waiting for something special</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Browse our collection and add your favorite juttis here.</p>
        <Link to="/shop">
          <Button variant="primary" style={{ marginTop: '1rem' }}>Explore Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0 var(--space-16)' }}>
      <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-8)' }}>My Wishlist</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 'var(--space-6)'
      }}>
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
