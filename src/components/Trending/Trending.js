import React from 'react';
import './Trending.css';

const items = [
  { rank:'01', name:'Silk Wrap Dress', sales:'240 sold', price:'₹8,999', img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
  { rank:'02', name:'Classic Wool Coat', sales:'198 sold', price:'₹22,999', img:'https://images.unsplash.com/photo-1548624313-0396a51c4b41?w=400&q=80' },
  { rank:'03', name:'Leather Belt Bag', sales:'175 sold', price:'₹6,499', img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
  { rank:'04', name:'Tailored Trousers', sales:'160 sold', price:'₹7,999', img:'https://images.unsplash.com/photo-1594938298603-c8148c4bef72?w=400&q=80' },
];

const Trending = () => (
  <section className="trending">
    <div className="trending-inner">
      <div className="trending-left">
        <p className="section-eyebrow">MOST POPULAR</p>
        <h2 className="section-title">Trending <span className="gold-text">Now</span></h2>
        <p className="trending-desc">Discover what fashion lovers are obsessing over this season.</p>
        <button className="btn-primary" style={{marginTop:'32px'}}>SHOP TRENDING</button>
      </div>
      <div className="trending-list">
        {items.map((item, i) => (
          <div key={i} className="trending-item">
            <span className="trend-rank">{item.rank}</span>
            <img src={item.img} alt={item.name} className="trend-img" />
            <div className="trend-info">
              <h4 className="trend-name">{item.name}</h4>
              <p className="trend-sales">{item.sales}</p>
            </div>
            <span className="trend-price">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Trending;