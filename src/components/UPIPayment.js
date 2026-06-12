import { QRCodeSVG } from 'qrcode.react'

function UPIPayment({ amount, onClose }) {
  const upiId = 'yourname@upi'  // ← apna UPI ID yahan daal
  const upiLink = `upi://pay?pa=${upiId}&pn=VyoraFashion&am=${amount}&cu=INR`

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '2rem', textAlign: 'center', width: '300px'
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Pay ₹{amount}</h3>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '1rem' }}>
          Google Pay / PhonePe / Paytm se scan karo
        </p>
        <QRCodeSVG value={upiLink} size={200} />
        <p style={{ fontFamily: 'monospace', fontSize: '13px', margin: '10px 0' }}>
          {upiId}
        </p>
        <button onClick={onClose} style={{
          padding: '10px 32px', background: '#111', color: 'white',
          border: 'none', borderRadius: '6px', cursor: 'pointer'
        }}>
          Done
        </button>
      </div>
    </div>
  )
}

export default UPIPayment