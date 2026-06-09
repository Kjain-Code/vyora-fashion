import React, { useState } from 'react';
import './Reviews.css';

const reviews = [
  { name:'Priya S.', rating:5, text:'Absolutely stunning quality! The silk dress I ordered exceeded all expectations. Vyora Fashion is now my go-to for premium clothing.', location:'Mumbai' },
  { name:'Arjun M.', rating:5, text:'The blazer fits perfectly and the fabric is exceptional. Fast delivery and beautiful packaging. Worth every rupee!', location:'Delhi' },
  { name:'Sneha R.', rating:5, text:'I was blown away by the attention to detail. The gold accents on the dress are breathtaking. Highly recommend!', location:'Bangalore' },
];

const Reviews = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="reviews">
      <div className="section-header">
        <p className="section-eyebrow">TESTIMONIALS</p>
        <h2 className="section-title">What Our <span className="gold-text">Clients Say</span></h2>
      </div>
      <div className="reviews-container">
        <div className="review-card">
          <div className="stars">{'★'.repeat(reviews[active].rating)}</div>
          <p className="review-text">"{reviews[active].text}"</p>
          <div className="reviewer">
            <span className="reviewer-name">{reviews[active].name}</span>
            <span className="reviewer-loc">{reviews[active].location}</span>
          </div>
        </div>
        <div className="review-dots">
          {reviews.map((_, i) => (
            <button key={i} className={`dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;