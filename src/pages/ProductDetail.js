import UPIPayment from '../components/UPIPayment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css';


const product = {
  id: 1,
  name: 'Noir Silk Dress',
  price: '₹8,999',
  description: 'Crafted from the finest silk, this dress embodies elegance and sophistication. Perfect for evening occasions, the fluid silhouette drapes beautifully on every body type.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['#1a1a1a', '#C9A84C', '#8B4513', '#2C3E50'],
  images: [
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
    'https://images.unsplash.com/photo-1566479179817-0b4be97a93e7?w=600&q=80',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
  ],
  reviews: [
    { name: 'Priya S.', rating: 5, text: 'Absolutely stunning! The fabric is luxurious.' },
    { name: 'Meera K.', rating: 5, text: 'Perfect fit, fast delivery. Love Vyora!' },
  ]
};

const related = [
  { id:2, name:'Gold Accent Blazer', price:'₹12,499', img:'https://images.unsplash.com/photo-1594938298603-c8148c4bef72?w=400&q=80' },
  { id:3, name:'Velvet Evening Gown', price:'₹18,999', img:'https://images.unsplash.com/photo-1566479179817-0b4be97a93e7?w=400&q=80' },
  { id:4, name:'Silk Wrap Dress', price:'₹9,999', img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
];

const ProductDetail = () => {
  const [showQR, setShowQR] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [tab, setTab] = useState('description');

  return (
    <div className="pd-page">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
      </div>

      <div className="pd-main">
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt="" className={`pd-thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)} />
            ))}
          </div>
          <div className="pd-main-img">
            <img src={product.images[activeImg]} alt={product.name} />
          </div>
        </div>

        {/* Info */}
        <div className="pd-info">
          <p className="pd-eyebrow">VYORA FASHION</p>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">{product.price}</p>
          <div className="pd-stars">★★★★★ <span>(48 reviews)</span></div>

          {/* Color */}
          <div className="pd-section">
            <p className="pd-label">COLOR</p>
            <div className="pd-colors">
              {product.colors.map((c, i) => (
                <button key={i} className={`color-dot ${selectedColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => setSelectedColor(c)} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="pd-section">
            <p className="pd-label">SIZE</p>
            <div className="pd-sizes">
              {product.sizes.map(s => (
                <button key={s} className={`size-btn ${selectedSize === s ? 'active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="pd-section">
            <p className="pd-label">QUANTITY</p>
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q+1)}>+</button>
            </div>
          </div>

          <div className="pd-btns">
            <button className="btn-cart">ADD TO CART</button>
            <button className="btn-buy">BUY NOW</button>
            <button className={`btn-wish ${wishlisted ? 'active' : ''}`} onClick={() => setWishlisted(!wishlisted)}>
              {wishlisted ? '♥' : '♡'}
            </button>
          </div>

          <div className="pd-meta">
            <p>✓ Free shipping on orders above ₹2,000</p>
            <p>✓ Easy 30-day returns</p>
            <p>✓ Authentic luxury fabrics</p>
          </div>

          {/* Tabs */}
          <div className="pd-tabs">
            {['description','reviews'].map(t => (
              <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tab === 'description' ? (
              <p className="pd-desc">{product.description}</p>
            ) : (
              <div className="pd-reviews">
                {product.reviews.map((r, i) => (
                  <div key={i} className="review-item">
                    <div className="review-header">
                      <span className="review-name">{r.name}</span>
                      <span className="review-stars">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="review-text">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="pd-related">
        <div className="section-header">
          <p className="section-eyebrow">YOU MAY ALSO LIKE</p>
          <h2 className="section-title">Related <span className="gold-text">Products</span></h2>
        </div>
        <div className="related-grid">
          {related.map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="product-card">
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} className="product-img" />
              </div>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-price">{p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;