import React from 'react';

export default function OrderRow({ order, index }) {
  return (
    <tr style={{ borderBottom: '1px solid #ccc' }}>
      <td>{order.id}</td>
      <td>{order.date}</td>
      <td>{order.model}</td>
      <td>{order.price}</td>
      <td>
        <span
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: order.status === 'В обработке' ? '#f0ad4e' :
                             order.status === 'Завершён' ? '#5cb85c' :
                             '#d9534f',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
}
