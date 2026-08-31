import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { products } from '../../data/products';
import Button from '../../components/ui/Button/Button';
import styles from './AdminProducts.module.scss';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search products by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="primary" leftIcon={<Plus size={18} />}>
          Add Product
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productCell}>
                    <img src={product.images[0]} alt={product.name} className={styles.productImage} loading="lazy" />
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>{product.name}</span>
                      <span className={styles.productId}>#{product.id}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.capitalize}>{product.category}</td>
                <td>
                  {product.salePrice ? (
                    <div>
                      <span>₹{product.salePrice}</span>
                      <span className={styles.oldPrice}>₹{product.price}</span>
                    </div>
                  ) : (
                    <span>₹{product.price}</span>
                  )}
                </td>
                <td>
                  <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.iconBtn} title="Edit"><Edit size={18} /></button>
                    <button className={styles.iconBtnDanger} title="Delete"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
