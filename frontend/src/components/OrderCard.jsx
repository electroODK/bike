import { useState } from 'react';
import ExtendModal from './ExtendModal';
import ConfirmCancel from './ConfirmCancel';

export default function OrderCard({ order, disableActions = false }) {
  const [showExtend, setShowExtend] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const handleExtendSubmit = (data) => {
    console.log('Продление отправлено:', data);
    alert(`Заказ #${data.orderId} продлён до ${data.newDate}\nДоплата: ${data.price} AED`);
  };

  const handleCancelConfirm = (orderId) => {
    console.log('Заказ отменён:', orderId);
    alert(`❌ Заказ #${orderId} отменён`);
    setShowCancel(false);
    // TODO: удалить заказ из списка или пометить как отменённый
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      background: '#fff'
    }}>
      <h3>{order.title}</h3>
      <p>📅 {order.dateFrom} → {order.dateTo}</p>
      <p>🕒 Тип аренды: {order.type}</p>
      <p>💰 Сумма: {order.price}</p>
      <p>🚚 Доставка: {order.delivery}</p>
      <p>🔄 Статус: <strong>{order.status}</strong></p>

      {!disableActions && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => setShowExtend(true)} style={{ marginRight: '1rem' }}>Продлить</button>
          <button onClick={() => setShowCancel(true)}>Отменить</button>
        </div>
      )}

      {showExtend && (
        <ExtendModal
          order={order}
          onClose={() => setShowExtend(false)}
          onSubmit={handleExtendSubmit}
        />
      )}

      {showCancel && (
        <ConfirmCancel
          orderId={order.id}
          onConfirm={handleCancelConfirm}
          onCancel={() => setShowCancel(false)}
        />
      )}
    </div>
  );
}
