import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const cats = [
  { title: 'WOMEN', sub: 'Elegant Collection', img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=600', link: '/shop?cat=women' },
  { title: 'MEN', sub: 'Premium Essentials', img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=600', link: '/shop?cat=men' },
  { title: 'ACCESSORIES', sub: 'Luxury Details', img: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=600', link: '/shop?cat=accessories' },
];

const Categories = () => (
  <section className="categories">
    <div className="section-header">
      <p className="section-eyebrow">SHOP BY CATEGORY</p>
      <h2 className="section-title">Curated <span className="gold-text">Collections</span></h2>
    </div>
    <div className="categories-grid">
      {cats.map((c, i) => (
        <Link to={c.link} key={i} className="cat-card">
          <div className="cat-img-wrap">
            <img src={c.img} alt={c.title} className="cat-img" />
            <div className="cat-overlay" />
          </div>
          <div className="cat-info">
            <p className="cat-sub">{c.sub}</p>
            <h3 className="cat-title">{c.title}</h3>
            <span className="cat-cta">EXPLORE →</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Categories;