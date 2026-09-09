import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useAuth } from '@clerk/react';
import styles from './AdminUsers.module.scss';
import clsx from 'clsx';

function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>User Details</h3>
          <button onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        
        <div className={styles.modalBody}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <img 
              src={user.imageUrl} 
              alt={user.firstName} 
              className={styles.avatar} 
              style={{ width: '80px', height: '80px' }} 
            />
          </div>
          
          <div className={styles.detailRow}>
            <strong>User ID</strong>
            <span>{user.id}</span>
          </div>
          <div className={styles.detailRow}>
            <strong>Full Name</strong>
            <span>{user.firstName} {user.lastName}</span>
          </div>
          <div className={styles.detailRow}>
            <strong>Email</strong>
            <span>{user.emailAddresses?.[0]?.emailAddress}</span>
          </div>
          <div className={styles.detailRow}>
            <strong>Created At</strong>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          <div className={styles.detailRow}>
            <strong>Last Login</strong>
            <span>{user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'Never'}</span>
          </div>
          <div className={styles.detailRow}>
            <strong>Status</strong>
            <span>
              <span className={clsx(styles.badge, user.banned ? styles.inactive : styles.active)}>
                {user.banned ? 'Inactive / Banned' : 'Active'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const { getToken } = useAuth();
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const token = await getToken();
        
        const res = await fetch('http://localhost:3001/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch users or not authorized');
        
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, [getToken]);

  const filteredUsers = useMemo(() => {
    let result = users;

    // Search
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(u => {
        const nameMatch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(lowerQ);
        const emailMatch = u.emailAddresses?.[0]?.emailAddress.toLowerCase().includes(lowerQ);
        const idMatch = u.id.toLowerCase().includes(lowerQ);
        return nameMatch || emailMatch || idMatch;
      });
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortOrder === 'newest') return b.createdAt - a.createdAt;
      return a.createdAt - b.createdAt;
    });

    return result;
  }, [users, searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) return <div className={styles.loadingState}>Loading users...</div>;
  if (error) return <div className={styles.errorState}>Error: {error}</div>;

  return (
    <div className={styles.usersContainer}>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or ID..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
          />
        </div>
        
        <select 
          className={styles.sortSelect}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>User ID</th>
              <th>Created</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className={styles.userProfileCell}>
                      {u.imageUrl ? (
                        <img src={u.imageUrl} alt={u.firstName} className={styles.avatar} />
                      ) : (
                        <div className={styles.avatarPlaceholder}>{u.firstName?.charAt(0) || 'U'}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{u.firstName} {u.lastName}</span>
                  </td>
                  <td>{u.emailAddresses?.[0]?.emailAddress}</td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                    {u.id.substring(0, 10)}...
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleDateString() : '-'}</td>
                  <td>
                    <span className={clsx(styles.badge, u.banned ? styles.inactive : styles.active)}>
                      {u.banned ? 'Inactive' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn} onClick={() => setSelectedUser(u)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className={styles.emptyState}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={page === 1} 
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
