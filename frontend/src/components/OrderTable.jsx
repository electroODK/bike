import React from 'react';
import OrderRow from './OrderRow';

export default function OrderTable({ orders }) {
  if (!orders.length) return <p>Нет заказов</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>№</th>
          <th>Дата</th>
          <th>Модель</th>
          <th>Стоимость</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <OrderRow key={order.id} order={order} index={index} />
        ))}
      </tbody>
    </table>
  );
}
