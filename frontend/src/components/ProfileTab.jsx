import { useState } from 'react';
import Avatar from './Avatar';

export default function ProfileTab() {
  const [form, setForm] = useState({
    name: 'Александр',
    email: 'example@gmail.com',
    phone: '999 999 999',
    address: 'г. А, ул. АБГ, д. 1',
    password: '************',
    avatarUrl: '', // Заглушка
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Сохраняем профиль:", form);
    alert("✅ Данные профиля сохранены (пока локально)");
    // позже: PATCH /user/:id
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Личные данные</h2>
      <Avatar src={form.avatarUrl} />
      <br /><br />

      <label>
        Имя:<br />
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </label>
      <br /><br />

      <label>
        Email:<br />
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </label>
      <br /><br />

      <label>
        Телефон:<br />
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
      </label>
      <br /><br />

      <label>
        Адрес:<br />
        <input type="text" name="address" value={form.address} onChange={handleChange} />
      </label>
      <br /><br />

      <label>
        Пароль:<br />
        <input type="password" name="password" value={form.password} onChange={handleChange} />
      </label>
      <br /><br />

      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
