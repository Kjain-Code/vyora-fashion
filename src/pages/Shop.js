import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const allProducts = [
  { id:1, name:'Noir Silk Dress', price:'₹8,999', cat:'women', img:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80' },
  { id:2, name:'Gold Accent Blazer', price:'₹12,499', cat:'men', img:'https://images.unsplash.com/photo-1594938298603-c8148c4bef72?w=500&q=80' },
  { id:3, name:'Premium Linen Shirt', price:'₹4,999', cat:'men', img:'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80' },
  { id:4, name:'Velvet Evening Gown', price:'₹18,999', cat:'women', img:'https://images.unsplash.com/photo-1566479179817-0b4be97a93e7?w=500&q=80' },
  { id:5, name:'Leather Belt Bag', price:'₹6,499', cat:'accessories', img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80' },
  { id:6, name:'Silk Wrap Dress', price:'₹9,999', cat:'women', img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80' },
  { id:7, name:'Classic Wool Coat', price:'₹22,999', cat:'men', img:'https://images.unsplash.com/photo-1548624313-0396a51c4b41?w=500&q=80' },
  { id:8, name:'Gold Chain Necklace', price:'₹3,499', cat:'accessories', img:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80' },
];

const Shop = () => {
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('default');
  const filtered = allProducts.filter(p => cat === 'all' || p.cat === cat);

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <p className="section-eyebrow">COLLECTIONS</p>
        <h1 className="shop-title">Shop <span className="gold-text">All</span></h1>
      </div>
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h4>CATEGORY</h4>
            {['all','women','men','accessories'].map(c => (
              <button key={c} className={`filter-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <h4>PRICE RANGE</h4>
            <input type="range" min="0" max="25000" className="price-slider" />
            <p className="price-label">₹0 — ₹25,000</p>
          </div>
          <div className="filter-group">
            <h4>SIZE</h4>
            {['XS','S','M','L','XL'].map(s => (
              <button key={s} className="size-btn">{s}</button>
            ))}
          </div>
        </aside>
        <div className="shop-content">
          <div className="shop-bar">
            <p className="result-count">{filtered.length} Products</p>
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="new">Newest First</option>
            </select>
          </div>
          <div className="shop-grid">
            {filtered.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="product-card">
                <div className="product-img-wrap">
                  <img src={p.img} alt={p.name} className="product-img" />
                  <div className="product-actions">
                    <button className="action-btn">♡</button>
                    <button className="action-btn primary">ADD TO CART</button>
                  </div>
                </div>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;