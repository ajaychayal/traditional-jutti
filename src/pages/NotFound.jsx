import { Link } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      gap: '1.5rem'
    }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '2rem', margin: 0 }}>Oops! This Jutti Took a Wrong Turn.</h2>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to="/">
          <Button variant="outline" leftIcon={<Home size={18} />}>Go Home</Button>
        </Link>
        <Link to="/shop">
          <Button variant="primary" leftIcon={<ShoppingBag size={18} />}>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
