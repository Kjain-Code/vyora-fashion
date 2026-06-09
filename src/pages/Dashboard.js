import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginService, register as registerService } from '../services/authService';
import { getMyOrders } from '../services/orderService';
import './Dashboard.css';

const Dashboard = () => {
  const { user, login, logout } = useAuth();
  const [tab, setTab] = useState('orders');
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'' });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      let userData;
      if (isLogin) {
        userData = await loginService(form.email, form.password);
      } else {
        userData = await registerService(form.name, form.email, form.password, form.phone);
      }
      login(userData);
      const myOrders = await getMyOrders();
      setOrders(myOrders);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  if (!user) return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="section-eyebrow">VYORA ACCOUNT</p>
        <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        {error && <p style={{color:'#f44336', fontSize:'12px', marginBottom:'16px', letterSpacing:'1px'}}>{error}</p>}
        {!isLogin && (
          <div className="form-group">
            <label>FULL NAME</label>
            <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
        )}
        <div className="form-group">
          <label>EMAIL</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        </div>
        <div className="form-group">
          <label>PASSWORD</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>PHONE</label>
            <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
        )}
        <button className="auth-btn" onClick={handleAuth} disabled={loading}>
          {loading ? 'PLEASE WAIT...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
        </button>
        <p className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <p className="section-eyebrow">MY ACCOUNT</p>
        <h1 className="dash-title">Welcome, <span className="gold-text">{user.name}</span></h1>
      </div>
      <div className="dash-layout">
        <aside className="dash-sidebar">
          {['orders','profile'].map(t => (
            <button key={t} className={`dash-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.toUpperCase()}
            </button>
          ))}
          <button className="dash-tab logout" onClick={logout}>LOGOUT</button>
        </aside>
        <div className="dash-content">
          {tab === 'orders' && (
            <div>
              <h3 className="content-title">Order History</h3>
              {orders.length === 0 ? (
                <p style={{color:'#ffffff44', fontSize:'13px', letterSpacing:'2px'}}>No orders yet.</p>
              ) : orders.map(o => (
                <div key={o._id} className="order-card">
                  <div className="order-top">
                    <span className="order-id">VYR-{o._id.slice(-5).toUpperCase()}</span>
                    <span className={`order-status ${o.status}`}>{o.status}</span>
                  </div>
                  <p className="order-items">{o.items?.map(i => i.name).join(', ')}</p>
                  <div className="order-bottom">
                    <span className="order-date">{new Date(o.createdAt).toLocaleDateString()}</span>
                    <span className="order-total">₹{o.totalPrice?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'profile' && (
            <div>
              <h3 className="content-title">Profile Details</h3>
              <div className="form-group"><label>FULL NAME</label><input defaultValue={user.name} /></div>
              <div className="form-group"><label>EMAIL</label><input defaultValue={user.email} /></div>
              <button className="save-btn">SAVE CHANGES</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;