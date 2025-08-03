import { Op } from 'sequelize';
import Rental from '../models/rental.js';
import RentalBike from '../models/rentalBike.js';
import User from '../models/user.js';
import Bike from '../models/bike.js';
import Station from '../models/station.js';

// ✅ 1. Создание аренды
export const createRentalController = async (req, res) => {
  try {
    const {
      user_id,
      start_station_id,
      end_station_id,
      start_date,
      end_date,
      bikes,
    } = req.body;

    if (!user_id || !start_station_id || !end_station_id || !start_date || !end_date || !bikes?.length) {
      return res.status(400).json({ message: 'Missing required fields', success: false });
    }

    const newRental = await Rental.create({
      user_id,
      start_station_id,
      end_station_id,
      start_date,
      end_date,
      status: 'booked',
    });

    for (const bike of bikes) {
      await RentalBike.create({
        rental_id: newRental.id,
        bike_id: bike.bike_id,
        is_helmet: bike.is_helmet || false,
        is_torch: bike.is_torch || false,
        is_lock: bike.is_lock || false,
      });
    }

    return res.status(201).json({
      message: 'Rental created successfully',
      rental_id: newRental.id,
      success: true,
    });
  } catch (err) {
    console.error('❌ Error in createRental:', err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// ✅ 2. Получение аренды по ID
export const getRentalByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'phone_number'] },
        { model: Station, as: 'start_station' },
        { model: Station, as: 'end_station' },
        {
          model: Bike,
          as: 'bikes',
          through: { model: RentalBike, attributes: ['is_helmet', 'is_torch', 'is_lock'] },
        },
      ],
    });

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }

    return res.status(200).json({ rental, success: true });
  } catch (err) {
    console.error('❌ Error in getRentalById:', err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// ✅ 3. Получение всех аренд пользователя
export const getUserRentalsController = async (req, res) => {
  try {
    const { user_id } = req.params;

    const rentals = await Rental.findAll({
      where: { user_id },
      include: [
        { model: Station, as: 'start_station' },
        { model: Station, as: 'end_station' },
        {
          model: Bike,
          as: 'bikes',
          through: { model: RentalBike, attributes: ['is_helmet', 'is_torch', 'is_lock'] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ rentals, success: true });
  } catch (err) {
    console.error('❌ Error in getUserRentals:', err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// ✅ 4. Обновление статуса аренды
export const updateRentalStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const rental = await Rental.findByPk(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }

    rental.status = status;
    await rental.save();

    return res.status(200).json({ message: 'Status updated', success: true });
  } catch (err) {
    console.error('❌ Error in updateRentalStatus:', err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// ✅ 5. Отмена аренды
export const cancelRentalController = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findByPk(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }

    if (rental.status !== 'booked') {
      return res.status(400).json({ message: 'Only booked rentals can be cancelled.', success: false });
    }

    rental.status = 'cancelled';
    await rental.save();

    return res.status(200).json({ message: 'Rental cancelled', success: true });
  } catch (err) {
    console.error('❌ Error in cancelRental:', err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};
