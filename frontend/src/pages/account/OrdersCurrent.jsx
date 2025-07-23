import { useState, useEffect } from 'react';
import OrderCard from '../../components/OrderCard';

export default function OrdersCurrent() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState('Все');
  const [loading, setLoading] = useState(true);

  const fakeFetchOrders = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Schwinn Traveler 20”',
            dateFrom: '2025-07-10 12:00',
            dateTo: '2025-07-15 12:00',
            type: 'По дням',
            price: '450 AED',
            delivery: 'По адресу',
            status: 'В обработке',
          },
          {
            id: 2,
            title: 'Trek X-Caliber 29"',
            dateFrom: '2025-07-05 14:00',
            dateTo: '2025-07-06 14:00',
            type: '2 часа',
            price: '90 AED',
            delivery: 'Самовывоз',
            status: 'Доставляется',
          },
          {
            id: 3,
            title: 'Merida Big Seven',
            dateFrom: '2025-07-01 10:00',
            dateTo: '2025-07-03 10:00',
            type: 'По дням',
            price: '180 AED',
            delivery: 'По адресу',
            status: 'В работе',
          }
        ]);
      }, 300);
    });

  useEffect(() => {
    fakeFetchOrders().then(data => {
      setOrders(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const filterByStatus = (statusLabel) => {
    setStatus(statusLabel);
    if (statusLabel === 'Все') {
      setFiltered(orders);
    } else {
      setFiltered(orders.filter(order => order.status === statusLabel));
    }
  };

  if (loading) return <p>Загрузка заказов...</p>;

  return (
    <div>
      <h2>📦 Текущие заказы</h2>

      <div style={{ marginBottom: '1rem' }}>
        {['Все', 'В обработке', 'Доставляется', 'В работе'].map(label => (
          <button
            key={label}
            onClick={() => filterByStatus(label)}
            style={{
              marginRight: '0.5rem',
              background: label === status ? '#4CAF50' : '#e0e0e0',
              color: label === status ? '#fff' : '#000',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p>Нет заказов по фильтру "{status}"</p>
      ) : (
        filtered.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      )}
    </div>
  );
}
