import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand">
        <p className="footer-logo">VYORA</p>
        <p className="footer-tagline">For Her. For Him. For You.</p>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social">IG</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social">FB</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social">TW</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social">YT</a>
        </div>
      </div>
      <div className="footer-links-group">
        <h4>SHOP</h4>
        <Link to="/shop?cat=women">Women</Link>
        <Link to="/shop?cat=men">Men</Link>
        <Link to="/shop?cat=accessories">Accessories</Link>
        <Link to="/shop">New Arrivals</Link>
      </div>
      <div className="footer-links-group">
        <h4>HELP</h4>
        <Link to="/">Size Guide</Link>
        <Link to="/">Shipping Info</Link>
        <Link to="/">Returns</Link>
        <Link to="/">Track Order</Link>
      </div>
      <div className="footer-links-group">
        <h4>COMPANY</h4>
        <Link to="/">About Us</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Press</Link>
        <Link to="/">Contact</Link>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 Vyora Fashion & Design. All rights reserved.</p>
      <p>Privacy Policy · Terms of Service</p>
    </div>
  </footer>
);

export default Footer;