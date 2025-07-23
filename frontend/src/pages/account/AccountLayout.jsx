import { Outlet, NavLink } from 'react-router-dom';

export default function AccountLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <nav>
          <ul>
            <li><NavLink to="/account/orders">📦 Текущие заказы</NavLink></li>
            <li><NavLink to="/account/orders/completed">✅ Завершённые</NavLink></li>
            <li><NavLink to="/account/profile">👤 Профиль</NavLink></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
