import { useState } from 'react';

export default function ExtendModal({ order, onClose, onSubmit }) {
  const [newDate, setNewDate] = useState('');
  const [price, setPrice] = useState(null);

  const calculatePrice = (newDateStr) => {
    const oldEnd = new Date(order.dateTo);
    const newEnd = new Date(newDateStr);
    const msDiff = newEnd - oldEnd;
    const days = msDiff / (1000 * 60 * 60 * 24);
    if (days > 0) {
      return days * 90; // допустим 90 AED/день
    }
    return 0;
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setNewDate(val);
    setPrice(calculatePrice(val));
  };

  const handleConfirm = () => {
    onSubmit({ orderId: order.id, newDate, price });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '0', left: '0',
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '300px' }}>
        <h3>Продлить аренду</h3>
        <p>Старое окончание: {order.dateTo}</p>
        <label>Новая дата окончания:
          <input type="datetime-local" value={newDate} onChange={handleChange} />
        </label>
        {price !== null && <p>💰 Доплата: {price} AED</p>}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleConfirm}>Подтвердить</button>
          <button onClick={onClose} style={{ marginLeft: '1rem' }}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
