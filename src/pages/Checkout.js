import React, { useState } from 'react';
import UPIPayment from '../components/UPIPayment';
import './Checkout.css';

const Checkout = () => {
  const [showQR, setShowQR] = useState(false);

  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('upi');
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="checkout-page">
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Order Confirmed!</h2>
        <p className="success-sub">Thank you for shopping with Vyora Fashion.</p>
        <p className="success-order">Order #VYR-{Math.floor(Math.random()*90000+10000)}</p>
        <p className="success-note">A confirmation email has been sent to your inbox.</p>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <p className="section-eyebrow">SECURE CHECKOUT</p>
        <h1 className="checkout-title">Complete <span className="gold-text">Your Order</span></h1>
      </div>

      <div className="checkout-steps">
        {['Information','Shipping','Payment'].map((s, i) => (
          <div key={i} className={`step ${step === i+1 ? 'active' : step > i+1 ? 'done' : ''}`}>
            <span className="step-num">{step > i+1 ? '✓' : i+1}</span>
            <span className="step-label">{s}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          {step === 1 && (
            <div className="form-section">
              <h3 className="form-title">Customer Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>FIRST NAME</label>
                  <input type="text" placeholder="Kritika" />
                </div>
                <div className="form-group">
                  <label>LAST NAME</label>
                  <input type="text" placeholder="Jain" />
                </div>
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" placeholder="kritika@example.com" />
              </div>
              <div className="form-group">
                <label>PHONE</label>
                <input type="tel" placeholder="+91 98765 43210" />
              </div>
              <button className="next-btn" onClick={() => setStep(2)}>CONTINUE TO SHIPPING</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3 className="form-title">Shipping Address</h3>
              <div className="form-group">
                <label>ADDRESS LINE 1</label>
                <input type="text" placeholder="House no., Street name" />
              </div>
              <div className="form-group">
                <label>ADDRESS LINE 2</label>
                <input type="text" placeholder="Apartment, Suite (optional)" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>CITY</label>
                  <input type="text" placeholder="Mumbai" />
                </div>
                <div className="form-group">
                  <label>PIN CODE</label>
                  <input type="text" placeholder="400001" />
                </div>
              </div>
              <div className="form-group">
                <label>STATE</label>
                <input type="text" placeholder="Maharashtra" />
              </div>
              <div className="form-nav">
                <button className="back-btn" onClick={() => setStep(1)}>← BACK</button>
                <button className="next-btn" onClick={() => setStep(3)}>CONTINUE TO PAYMENT</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h3 className="form-title">Payment Method</h3>
              <div className="payment-methods">
                {[
                  { id:'upi', label:'UPI', icon:'💳' },
                  { id:'card', label:'Debit / Credit Card', icon:'🏦' },
                  { id:'netbanking', label:'Net Banking', icon:'🌐' },
                  { id:'cod', label:'Cash on Delivery', icon:'💵' },
                ].map(m => (
                  <div key={m.id} className={`payment-option ${payment === m.id ? 'active' : ''}`} onClick={() => setPayment(m.id)}>
                    <span className="pay-icon">{m.icon}</span>
                    <span className="pay-label">{m.label}</span>
                    <span className="pay-radio">{payment === m.id ? '●' : '○'}</span>
                  </div>
                ))}
              </div>

              {payment === 'upi' && (
                <div className="form-group" style={{marginTop:'24px'}}>
                  <label>UPI ID</label>
                  <input type="text" placeholder="yourname@upi" />
                </div>
              )}
              {payment === 'card' && (
                <div style={{marginTop:'24px'}}>
                  <div className="form-group"><label>CARD NUMBER</label><input placeholder="1234 5678 9012 3456" /></div>
                  <div className="form-row">
                    <div className="form-group"><label>EXPIRY</label><input placeholder="MM/YY" /></div>
                    <div className="form-group"><label>CVV</label><input placeholder="•••" /></div>
                  </div>
                </div>
              )}

              <div className="form-nav">
                <button className="back-btn" onClick={() => setStep(2)}>← BACK</button>
                {/* <button className="next-btn" onClick={() => setDone(true)}>PLACE ORDER</button> */}
                <button className="next-btn" onClick={() => setShowQR(true)}>PLACE ORDER</button>

{showQR && (
  <UPIPayment
    amount={21498}
    onClose={() => { setShowQR(false); setDone(true); }}
  />
)}
              </div>
            </div>
          )}
        </div>

        <div className="checkout-summary">
          <h3 className="summary-title">ORDER SUMMARY</h3>
          <div className="co-item">
            <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&q=80" alt="" />
            <div><p>Noir Silk Dress</p><p className="co-meta">Size: M · Qty: 1</p></div>
            <span>₹8,999</span>
          </div>
          <div className="co-item">
            <img src="https://images.unsplash.com/photo-1594938298603-c8148c4bef72?w=100&q=80" alt="" />
            <div><p>Gold Accent Blazer</p><p className="co-meta">Size: L · Qty: 1</p></div>
            <span>₹12,499</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><span>₹21,498</span></div>
          <div className="summary-row"><span>Shipping</span><span>FREE</span></div>
          <div className="summary-divider" />
          <div className="summary-row total"><span>TOTAL</span><span>₹21,498</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;