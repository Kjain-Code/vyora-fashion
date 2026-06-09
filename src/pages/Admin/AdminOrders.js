import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const initialOrders = [
  { id:'VYR-10234', customer:'Priya Sharma', email:'priya@email.com', amount:'₹8,999', status:'delivered', date:'Jun 7, 2026', items:'Noir Silk Dress (M)' },
  { id:'VYR-10233', customer:'Arjun Mehta', email:'arjun@email.com', amount:'₹12,499', status:'shipped', date:'Jun 7, 2026', items:'Gold Accent Blazer (L)' },
  { id:'VYR-10232', customer:'Sneha Reddy', email:'sneha@email.com', amount:'₹18,999', status:'processing', date:'Jun 6, 2026', items:'Velvet Evening Gown (S)' },
  { id:'VYR-10231', customer:'Rahul Jain', email:'rahul@email.com', amount:'₹4,999', status:'confirmed', date:'Jun 6, 2026', items:'Premium Linen Shirt (M)' },
  { id:'VYR-10230', customer:'Meera Kapoor', email:'meera@email.com', amount:'₹22,999', status:'pending', date:'Jun 5, 2026', items:'Classic Wool Coat (L)' },
  { id:'VYR-10229', customer:'Vikram Singh', email:'vikram@email.com', amount:'₹6,499', status:'cancelled', date:'Jun 5, 2026', items:'Leather Belt Bag' },
];

const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('all');

  const updateStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="card-header">
          <h3>All Orders ({filtered.length})</h3>
          <div className="filter-tabs">
            {['all', 'pending', 'processing', 'shipped', 'delivered'].map(f => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="order-id-cell">{o.id}</td>
                <td>
                  <div>{o.customer}</div>
                  <div className="sub-text">{o.email}</div>
                </td>
                <td className="items-cell">{o.items}</td>
                <td className="amount-cell">{o.amount}</td>
                <td className="date-cell">{o.date}</td>
                <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
                <td>
                  <select className="status-select" value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;