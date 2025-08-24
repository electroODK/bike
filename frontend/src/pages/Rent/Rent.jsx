import React, { useState } from 'react';
import { createRental } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import s from './Rent.module.scss';
import { MyContext } from '../../../context.jsx';
import bikes from '../../../bikesData.js';

const Rent = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startStationId, setStartStationId] = useState('');
  const [endStationId, setEndStationId] = useState('');

  // Список велосипедов (можно брать с API)
  const [bikes, setBikes] = useState([
    { id: 1, title: 'Горный велосипед', image: '/bike1.png' },
    { id: 2, title: 'Шоссейный велосипед', image: '/bike2.png' }
  ]);

  // Опции аренды по каждому велосипеду
  const [bikeOptions, setBikeOptions] = useState(
    bikes.map(() => ({ helmet: false, light: false, lock: false }))
  );

  const navigate = useNavigate();

  // Обновление чекбоксов
  const handleCheckBoxChange = (index, option) => {
    const newOptions = [...bikeOptions];
    newOptions[index][option] = !newOptions[index][option];
    setBikeOptions(newOptions);
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rentalData = {
      user_id: 1, // заменить на ID авторизованного пользователя
      start_station_id: +startStationId,
      end_station_id: +endStationId,
      start_date: startDate,
      end_date: endDate,
      bikes: bikes.map((bike, i) => ({
        bike_id: bike.id,
        is_helmet: bikeOptions[i].helmet,
        is_torch: bikeOptions[i].light,
        is_lock: bikeOptions[i].lock,
      })),
    };

    try {
      const res = await createRental(rentalData);
      console.log('Rental created:', res.data);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при создании аренды:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>Заявка на аренду велосипедов</h1>

        <div className={s.BikesList}>
          {bikes.map((bike, i) => (
            <div key={bike.id} className={s.bikeItem}>
              <div className={s.titleBikes}>
                <img src={bike.image} alt="bike" />
                <h4 className={s.title}>{bike.title}</h4>
              </div>

              <div className={s.devices}>
                <div className={s.titles}>
                  <div>Шлем</div>
                  <div>Фонарик</div>
                  <div>Замок</div>
                  <div>Стоимость</div>
                </div>

                <div className={s.bikeRow}>
                  <input
                    type="checkbox"
                    checked={bikeOptions[i].helmet}
                    onChange={() => handleCheckBoxChange(i, 'helmet')}
                  />
                  <input
                    type="checkbox"
                    checked={bikeOptions[i].light}
                    onChange={() => handleCheckBoxChange(i, 'light')}
                  />
                  <input
                    type="checkbox"
                    checked={bikeOptions[i].lock}
                    onChange={() => handleCheckBoxChange(i, 'lock')}
                  />
                  <div className={s.price}>
                  <h4 className={s.title}>{bike.price}</h4>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className={s.submitButton}>
          Отправить заявку
        </button>
      </div>
    </form>
  );
};

export default Rent;
