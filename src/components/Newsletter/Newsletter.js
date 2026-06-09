import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <p className="section-eyebrow">STAY CONNECTED</p>
        <h2 className="nl-title">Join the <span className="gold-text">Vyora Circle</span></h2>
        <p className="nl-sub">Get exclusive access to new arrivals, private sales & style inspiration.</p>
        {done ? (
          <p className="nl-success">✓ Welcome to Vyora Circle! Check your inbox.</p>
        ) : (
          <form className="nl-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} className="nl-input" required />
            <button type="submit" className="nl-btn">SUBSCRIBE</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;