import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import './Admin.css';

const stats = [
  { label: 'Total Orders', value: '124', icon: '📦', change: '+12%', color: '#C9A84C' },
  { label: 'Total Revenue', value: '₹4,82,500', icon: '💰', change: '+8%', color: '#4CAF50' },
  { label: 'Total Products', value: '48', icon: '👗', change: '+3', color: '#2196F3' },
  { label: 'Total Users', value: '892', icon: '👥', change: '+24', color: '#9C27B0' },
];

const recentOrders = [
  { id: 'VYR-10234', customer: 'Priya Sharma', amount: '₹8,999', status: 'delivered', date: 'Jun 7' },
  { id: 'VYR-10233', customer: 'Arjun Mehta', amount: '₹12,499', status: 'shipped', date: 'Jun 7' },
  { id: 'VYR-10232', customer: 'Sneha Reddy', amount: '₹18,999', status: 'processing', date: 'Jun 6' },
  { id: 'VYR-10231', customer: 'Rahul Jain', amount: '₹4,999', status: 'confirmed', date: 'Jun 6' },
  { id: 'VYR-10230', customer: 'Meera Kapoor', amount: '₹22,999', status: 'pending', date: 'Jun 5' },
];

const AdminDashboard = () => (
  <AdminLayout>
    <div className="stats-grid">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <div className="stat-icon" style={{ background: s.color + '22', color: s.color }}>{s.icon}</div>
          <div className="stat-info">
            <p className="stat-label">{s.label}</p>
            <h3 className="stat-value">{s.value}</h3>
            <span className="stat-change">{s.change} this month</span>
          </div>
        </div>
      ))}
    </div>

    <div className="admin-card">
      <div className="card-header">
        <h3>Recent Orders</h3>
        <Link to="/admin/orders" className="view-all-btn">View All →</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((o, i) => (
            <tr key={i}>
              <td className="order-id-cell">{o.id}</td>
              <td>{o.customer}</td>
              <td className="amount-cell">{o.amount}</td>
              <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
              <td className="date-cell">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="quick-stats">
      <div className="quick-stat-card">
        <h4>Top Category</h4>
        <p className="quick-value">Women</p>
        <p className="quick-sub">68% of sales</p>
      </div>
      <div className="quick-stat-card">
        <h4>Avg Order Value</h4>
        <p className="quick-value">₹9,840</p>
        <p className="quick-sub">+5% vs last month</p>
      </div>
      <div className="quick-stat-card">
        <h4>Pending Orders</h4>
        <p className="quick-value" style={{color:'#ff9800'}}>12</p>
        <p className="quick-sub">Need attention</p>
      </div>
      <div className="quick-stat-card">
        <h4>Low Stock</h4>
        <p className="quick-value" style={{color:'#f44336'}}>5</p>
        <p className="quick-sub">Products need restock</p>
      </div>
    </div>
  </AdminLayout>
);

export default AdminDashboard;