import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard/ProductCard';
import Button from '../components/ui/Button/Button';
import styles from './Shop.module.scss';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialCollection = searchParams.get('collection');
  const searchQuery = searchParams.get('search');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: initialCategory ? [initialCategory] : [],
    size: [],
    color: [],
  });
  const [sortBy, setSortBy] = useState('popular');

  const toggleFilterMenu = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (initialCollection === 'new-arrivals') {
      result = result.filter(p => p.badges.includes('new'));
    } else if (initialCollection === 'best-sellers') {
      result = result.filter(p => p.badges.includes('bestSeller'));
    } else if (initialCollection === 'featured') {
      result = result.filter(p => p.badges.includes('featured'));
    }

    // Apply search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Apply active filters
    if (filters.category.length > 0) {
      result = result.filter(p => filters.category.includes(p.category));
    }
    
    if (filters.size.length > 0) {
      result = result.filter(p => p.sizes.some(size => filters.size.includes(size.toString())));
    }

    if (filters.color.length > 0) {
      result = result.filter(p => p.colors.some(c => filters.color.includes(c)));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [filters, sortBy, initialCollection, searchQuery]);

  // Extract unique filter options from products
  const allSizes = [...new Set(products.flatMap(p => p.sizes))].sort();
  const allColors = [...new Set(products.flatMap(p => p.colors))].sort();

  return (
    <div className={styles.shopPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Collection'}
          </h1>
          <div className={styles.breadcrumb}>
            <span>Home</span> / <span>Shop</span> {searchQuery && <span>/ Search</span>}
          </div>
        </div>
      </div>

      <div className={clsx('container', styles.shopContainer)}>
        {/* Mobile Filter Toggle & Sort */}
        <div className={styles.mobileControls}>
          <Button variant="outline" onClick={toggleFilterMenu} leftIcon={<Filter size={18} />}>
            Filter
          </Button>
          <div className={styles.sortWrapperMobile}>
             <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className={clsx(styles.sidebar, { [styles.sidebarOpen]: isFilterOpen })}>
          <div className={styles.sidebarHeader}>
            <h2>Filters</h2>
            <button className={styles.closeBtn} onClick={toggleFilterMenu}>
              <X size={24} />
            </button>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Category</h3>
            <div className={styles.filterOptions}>
              {['womens', 'mens', 'kids', 'bridal'].map(cat => (
                <label key={cat} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={filters.category.includes(cat)}
                    onChange={() => handleFilterChange('category', cat)}
                  />
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)} Jutti</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Size</h3>
            <div className={styles.filterOptionsInline}>
              {allSizes.map(size => (
                <label key={size} className={clsx(styles.sizeLabel, { [styles.active]: filters.size.includes(size.toString()) })}>
                  <input 
                    type="checkbox" 
                    className="visually-hidden"
                    checked={filters.size.includes(size.toString())}
                    onChange={() => handleFilterChange('size', size.toString())}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Color</h3>
            <div className={styles.filterOptions}>
              {allColors.map(color => (
                <label key={color} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={filters.color.includes(color)}
                    onChange={() => handleFilterChange('color', color)}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.resultsHeader}>
            <p>Showing <strong>{filteredProducts.length}</strong> results</p>
            
            <div className={styles.sortWrapper}>
              <label htmlFor="sort">Sort by:</label>
              <div className={styles.selectWrapper}>
                <select 
                  id="sort"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={16} className={styles.selectIcon} />
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No products found</h3>
              <p>Try adjusting your filters to find what you're looking for.</p>
              <Button variant="primary" onClick={() => setFilters({ category: [], size: [], color: [] })}>
                Clear All Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
