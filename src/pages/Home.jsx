import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard/ProductCard';
import Button from '../components/ui/Button/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Home.module.scss';

export default function Home() {
  const featuredProducts = products.filter(p => p.badges.includes('featured') || p.badges.includes('new')).slice(0, 4);
  const bestSellers = products.filter(p => p.badges.includes('bestSeller')).slice(0, 4);

  return (
    <div className={styles.home}>
      {/* Elevated Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={clsx('container', styles.heroContainer)}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Heritage Meets Modernity</span>
            <h1 className={styles.heroTitle}>The Art of <br/>Punjabi Jutti</h1>
            <p className={styles.heroDescription}>
              Discover handcrafted masterpieces designed for the modern wardrobe. Experience pure leather comfort with exquisite traditional embroidery.
            </p>
            <div className={styles.heroActions}>
              <Link to="/shop">
                <Button variant="primary" size="lg" className={styles.shopBtn} rightIcon={<ArrowRight size={20} />}>
                  Shop Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique Categories Section */}
      <section className={clsx('container', styles.section, styles.categorySection)}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionSubtitle}>Curated For You</span>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
        </div>
        
        <div className={styles.categoryMasonry}>
          <Link to="/shop?category=womens" className={clsx(styles.categoryCard, styles.cardLarge)}>
            <img src={`${import.meta.env.BASE_URL}images/prod-1.png`} alt="Women's Jutti" loading="lazy" />
            <div className={styles.categoryOverlay}>
              <h3>Women's Collection</h3>
              <span>Explore</span>
            </div>
          </Link>
          
          <div className={styles.categoryColumn}>
            <Link to="/shop?category=bridal" className={styles.categoryCard}>
              <img src={`${import.meta.env.BASE_URL}images/prod-2.png`} alt="Bridal Collection" loading="lazy" />
              <div className={styles.categoryOverlay}>
                <h3>Bridal Edit</h3>
                <span>Explore</span>
              </div>
            </Link>
            <Link to="/shop?category=mens" className={styles.categoryCard}>
              <img src={`${import.meta.env.BASE_URL}images/prod-3.png`} alt="Men's Jutti" loading="lazy" />
              <div className={styles.categoryOverlay}>
                <h3>Men's Classic</h3>
                <span>Explore</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionSubtitle}>Trending Now</span>
              <h2 className={styles.sectionTitle}>New Arrivals</h2>
            </div>
            <Link to="/shop?collection=new-arrivals">
              <Button variant="link" rightIcon={<ArrowRight size={16} />}>View All</Button>
            </Link>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section className={styles.craftsmanshipBanner}>
        <div className={styles.craftsmanshipContent}>
          <h2>The Jutti Experience</h2>
          <p>Every pair is meticulously crafted by skilled artisans using premium leather, ensuring a perfect fit that molds to your feet over time.</p>
          <Link to="/experience">
            <Button variant="outline" className={styles.lightBtn}>Discover Our Heritage</Button>
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className={clsx('container', styles.section)}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionSubtitle}>Customer Favorites</span>
            <h2 className={styles.sectionTitle}>Best Sellers</h2>
          </div>
          <Link to="/shop?collection=best-sellers">
            <Button variant="link" rightIcon={<ArrowRight size={16} />}>View All</Button>
          </Link>
        </div>
        <div className={styles.productGrid}>
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
