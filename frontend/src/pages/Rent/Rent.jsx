import React, { useState } from 'react';
import { createRental } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import styles from './Rent.module.scss'; // Предполагается, что стили находятся в этом файле

const Rent = () => {
  const [bikeId, setBikeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startStationId, setStartStationId] = useState('');
  const [endStationId, setEndStationId] = useState('');
  const [options, setOptions] = useState({
    is_helmet: false,
    is_torch: false,
    is_lock: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rentalData = {
      user_id: 1, // заменить на ID авторизованного пользователя
      start_station_id: +startStationId,
      end_station_id: +endStationId,
      start_date: startDate,
      end_date: endDate,
      bikes: [
        {
          bike_id: +bikeId,
          ...options,
        },
      ],
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
    <div className={styles.container}>
      <h2 className={styles.title}>Оформление аренды</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="ID велосипеда"
          value={bikeId}
          onChange={(e) => setBikeId(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="ID станции старта"
          value={startStationId}
          onChange={(e) => setStartStationId(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="ID станции конца"
          value={endStationId}
          onChange={(e) => setEndStationId(e.target.value)}
          className={styles.input}
          required
        />

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={options.is_helmet}
              onChange={() =>
                setOptions((prev) => ({ ...prev, is_helmet: !prev.is_helmet }))
              }
            />
            Шлем
          </label>
          <label>
            <input
              type="checkbox"
              checked={options.is_torch}
              onChange={() =>
                setOptions((prev) => ({ ...prev, is_torch: !prev.is_torch }))
              }
            />
            Фонарик
          </label>
          <label>
            <input
              type="checkbox"
              checked={options.is_lock}
              onChange={() =>
                setOptions((prev) => ({ ...prev, is_lock: !prev.is_lock }))
              }
            />
            Замок
          </label>
        </div>

        <button type="submit" className={styles.button}>
          Забронировать
        </button>
      </form>
    </div>
  );
};

export default Rent;
