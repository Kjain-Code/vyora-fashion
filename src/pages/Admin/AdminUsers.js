import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const initialUsers = [
  { id:1, name:'Priya Sharma', email:'priya@email.com', role:'user', orders:5, joined:'Jan 2026', status:'active' },
  { id:2, name:'Arjun Mehta', email:'arjun@email.com', role:'user', orders:3, joined:'Feb 2026', status:'active' },
  { id:3, name:'Sneha Reddy', email:'sneha@email.com', role:'user', orders:8, joined:'Mar 2026', status:'active' },
  { id:4, name:'Rahul Jain', email:'rahul@email.com', role:'admin', orders:0, joined:'Jan 2026', status:'active' },
  { id:5, name:'Meera Kapoor', email:'meera@email.com', role:'user', orders:2, joined:'May 2026', status:'inactive' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u));
  };

  const deleteUser = (id) => {
    if (window.confirm('Delete this user?')) setUsers(users.filter(u => u.id !== id));
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="card-header">
          <h3>All Users ({filtered.length})</h3>
          <input
            className="search-input"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Orders</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{u.name.charAt(0)}</div>
                    <span>{u.name}</span>
                  </div>
                </td>
                <td className="sub-text">{u.email}</td>
                <td>
                  <span className={`role-badge ${u.role}`}>{u.role}</span>
                </td>
                <td>{u.orders}</td>
                <td className="date-cell">{u.joined}</td>
                <td><span className={`status-badge ${u.status}`}>{u.status}</span></td>
                <td>
                  <button className="edit-btn" onClick={() => toggleRole(u.id)}>
                    {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                  </button>
                  <button className="delete-btn" onClick={() => deleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;