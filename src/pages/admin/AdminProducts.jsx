import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Upload } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import { useAuth } from '@clerk/react';
import { toast } from 'react-toastify';
import styles from './AdminProducts.module.scss';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    id: '', name: '', category: 'traditional', price: '', salePrice: '', 
    description: '', inStock: true, imageFile: null, imageUrl: ''
  });

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.price || (!formData.imageFile && !formData.imageUrl)) {
      toast.error('Please fill required fields and select an image');
      return;
    }

    try {
      setIsUploading(true);
      const token = await getToken();
      let uploadedImageUrl = formData.imageUrl;

      // 1. Upload Image if new file selected
      if (formData.imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.imageFile);

        const imgRes = await fetch('http://localhost:3001/api/products/upload-image', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: imageFormData
        });
        const imgData = await imgRes.json();
        
        if (!imgRes.ok) throw new Error(imgData.error || 'Failed to upload image');
        uploadedImageUrl = imgData.imageUrl;
      }

      // 2. Save Product to DB
      const productPayload = {
        id: formData.id,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        description: formData.description,
        inStock: formData.inStock,
        images: [uploadedImageUrl]
      };

      const res = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productPayload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save product');
      }

      toast.success('Product added successfully!');
      setIsModalOpen(false);
      setFormData({ id: '', name: '', category: 'traditional', price: '', salePrice: '', description: '', inStock: true, imageFile: null, imageUrl: '' });
      fetchProducts(); // Refresh list

    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
        <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          Add Product
        </Button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Loading products...</p>
        ) : (
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
              {filteredProducts.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No products found in Database.</td></tr>
              ) : filteredProducts.map(product => (
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
                      <button className={styles.iconBtnDanger} title="Delete" onClick={() => handleDelete(product.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Add New Product</h3>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            
            <form className={styles.modalForm} onSubmit={handleAddSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Product ID (e.g. prod-001)</label>
                  <input type="text" name="id" value={formData.id} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="traditional">Traditional</option>
                    <option value="bridal">Bridal</option>
                    <option value="casual">Casual</option>
                    <option value="premium">Premium</option>
                    <option value="festive">Festive</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>In Stock</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '42px' }}>
                    <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} style={{ width: '20px', height: '20px' }} />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Regular Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Sale Price (₹) - Optional</label>
                  <input type="number" name="salePrice" value={formData.salePrice} onChange={handleInputChange} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Upload Image</label>
                <div className={styles.imageUploadBox}>
                  <input type="file" accept="image/*" id="imageFile" onChange={handleImageChange} className={styles.fileInput} />
                  <label htmlFor="imageFile" className={styles.fileLabel}>
                    <Upload size={24} />
                    <span>{formData.imageFile ? formData.imageFile.name : 'Click to select an image'}</span>
                  </label>
                </div>
              </div>

              <div className={styles.modalActions}>
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={isUploading}>
                  {isUploading ? 'Saving...' : 'Save Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
