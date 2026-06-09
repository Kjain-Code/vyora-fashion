import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const initialProducts = [
  { id:1, name:'Noir Silk Dress', category:'women', price:8999, stock:24, status:'active', img:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=80' },
  { id:2, name:'Gold Accent Blazer', category:'men', price:12499, stock:15, status:'active', img:'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=80' },
  { id:3, name:'Velvet Evening Gown', category:'women', price:18999, stock:8, status:'active', img:'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?w=80' },
  { id:4, name:'Leather Belt Bag', category:'accessories', price:6499, stock:32, status:'active', img:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=80' },
  { id:5, name:'Classic Wool Coat', category:'men', price:22999, stock:3, status:'low_stock', img:'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=80' },
];

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name:'', category:'women', price:'', stock:'', status:'active' });

  const handleEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, status: p.status });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...form } : p));
    } else {
      setProducts([...products, { id: Date.now(), ...form, img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=80' }]);
    }
    setShowModal(false);
    setEditProduct(null);
    setForm({ name:'', category:'women', price:'', stock:'', status:'active' });
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="card-header">
          <h3>All Products ({products.length})</h3>
          <button className="add-btn" onClick={() => { setEditProduct(null); setShowModal(true); }}>+ Add Product</button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="product-cell">
                    <img src={p.img} alt={p.name} className="product-thumb" />
                    <span>{p.name}</span>
                  </div>
                </td>
                <td><span className="cat-badge">{p.category}</span></td>
                <td className="amount-cell">₹{Number(p.price).toLocaleString()}</td>
                <td><span className={p.stock <= 5 ? 'low-stock-text' : ''}>{p.stock}</span></td>
                <td><span className={`status-badge ${p.status}`}>{p.status}</span></td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <div className="form-group">
              <label>Product Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product name" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Price" />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="Stock" />
              </div>
            </div>
            <div className="modal-btns">
              <button className="save-btn" onClick={handleSave}>SAVE</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;