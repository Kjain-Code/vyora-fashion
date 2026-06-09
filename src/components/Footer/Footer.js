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
          <a href="#" className="social">IG</a>
          <a href="#" className="social">FB</a>
          <a href="#" className="social">TW</a>
          <a href="#" className="social">YT</a>
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
        <a href="#">Size Guide</a>
        <a href="#">Shipping Info</a>
        <a href="#">Returns</a>
        <a href="#">Track Order</a>
      </div>
      <div className="footer-links-group">
        <h4>COMPANY</h4>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Press</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 Vyora Fashion & Design. All rights reserved.</p>
      <p>Privacy Policy · Terms of Service</p>
    </div>
  </footer>
);

export default Footer;