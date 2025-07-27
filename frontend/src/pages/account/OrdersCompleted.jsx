import { useState, useEffect } from 'react';
import OrderCard from '../../components/OrderCard';

export default function OrdersCompleted() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fakeFetchCompletedOrders = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 101,
            title: 'Merida City 21”',
            dateFrom: '2025-06-20 10:00',
            dateTo: '2025-06-25 10:00',
            type: 'По дням',
            price: '360 AED',
            delivery: 'По адресу',
            status: 'Завершён',
          }
        ]);
      }, 500);
    });

  useEffect(() => {
    fakeFetchCompletedOrders().then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Загрузка завершённых заказов...</p>;

  return (
    <div>
      <h2>✅ Завершённые заказы</h2>
      {orders.length === 0 ? (
        <p>Нет завершённых заказов</p>
      ) : (
        orders.map(order => (
          <OrderCard key={order.id} order={order} disableActions />
        ))
      )}
    </div>
  );
}
