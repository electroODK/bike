export default function ConfirmCancel({ orderId, onConfirm, onCancel }) {
   return (
     <div style={{
       position: 'fixed',
       top: 0, left: 0,
       width: '100%', height: '100%',
       background: 'rgba(0,0,0,0.4)',
       display: 'flex', justifyContent: 'center', alignItems: 'center'
     }}>
       <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px' }}>
         <h3>Отменить заказ?</h3>
         <p>Вы уверены, что хотите отменить заказ #{orderId}?</p>
         <div style={{ marginTop: '1rem' }}>
           <button onClick={() => onConfirm(orderId)}>Да, отменить</button>
           <button onClick={onCancel} style={{ marginLeft: '1rem' }}>Нет</button>
         </div>
       </div>
     </div>
   );
 }
 