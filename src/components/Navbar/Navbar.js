import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Scroll lock — saves position, restores on close
  useEffect(() => {
    if (menuOpen) {
      scrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollY.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Women', to: '/shop?cat=women' },
    { label: 'Men', to: '/shop?cat=men' },
    { label: 'Accessories', to: '/shop?cat=accessories' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-active' : ''}`}>
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-text">VYORA</span>
          <span className="logo-sub">FASHION & DESIGN</span>
        </Link>

        <div className="navbar-right">
          <Link to="/shop" className="nav-icon" onClick={() => setMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <Link to="/dashboard" className="nav-icon" onClick={() => setMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </Link>
          <Link to="/cart" className="nav-icon cart-wrap" onClick={() => setMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="cart-badge">{totalItems}</span>
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu-inner">
          <div className="menu-links">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="menu-link"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-link-num">0{i + 1}</span>
                <span className="menu-link-text">{link.label}</span>
                <span className="menu-link-arrow">→</span>
              </Link>
            ))}
          </div>
          <div className="menu-footer">
            <div className="menu-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            </div>
            <p className="menu-tagline">For Her. For Him. For You.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;