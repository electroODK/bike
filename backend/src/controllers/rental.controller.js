import Rental from '../models/rental.js';
import { Op } from 'sequelize';


//  Создает новую аренду велосипеда
 
export const createRental = async (req, res) => {
  try {
    const { userId, bikeId, startDate, endDate } = req.body;

    // Валидация полей
    if (!userId || !bikeId || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'The end date must be later than the start date.', success: false });
    }

    // Проверка существования пользователя и велосипеда
    const [user, bike] = await Promise.all([
      user.findByPk(userId),
      bike.findByPk(bikeId),
    ]);
    if (!user || !bike) {
      return res.status(404).json({ message: 'User or bike not found', success: false });
    }

    // Проверка занятости велосипеда
    const isBikeBusy = await Rental.findOne({
      where: {
        bikeId,
        [Op.and]: [
          { startDate: { [Op.lt]: endDate } },
          { endDate: { [Op.gt]: startDate } },
        ],
      },
    });

    if (isBikeBusy) {
      return res.status(409).json({ message: 'The bike is booked for the selected dates', success: false });
    }

    // Создание аренды
    const newRental = await Rental.create({
      userId,
      bikeId,
      startDate,
      endDate,
      status: 'booked',
    });

    // Ограничение полей в ответе
    const { id, startDate: sd, endDate: ed, status } = newRental;
    return res.status(201).json({
      message: 'Lease created successfully',
      rental: { id, userId, bikeId, startDate: sd, endDate: ed, status },
      success: true,
    });
  } catch (err) {
    console.error('error in createRental:', err);
    return res.status(500).json({ message: 'Server error', error: err.message, success: false });
  }
};


//  Получает все аренды с пагинацией
 
export const getAllRentals = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const rentals = await Rental.findAll({
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Bike, attributes: ['id', 'name', 'type'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return res.status(200).json({ rentals: rentals || [], success: true });
  } catch (err) {
    console.error('error in getAllRentals:', err);
    return res.status(500).json({ message: 'Server error', error: err.message, success: false });
  }
};

/**
 * Отменяет аренду
 */
export const cancelRental = async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findByPk(id);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found', success: false });
    }

    if (req.user?.id !== rental.userId) {
      return res.status(403).json({ message: 'No rights to cancel the lease', success: false });
    }

    if (rental.status !== 'booked') {
      return res.status(400).json({ message: 'Only booked rentals can be cancelled.', success: false });
    }

    if (new Date(rental.startDate) <= new Date()) {
      return res.status(400).json({ message: 'You cannot cancel a past rental', success: false });
    }

    rental.status = 'cancelled';
    await rental.save();

    const { userId, bikeId, startDate, endDate, status } = rental;
    return res.status(200).json({
      message: 'Rental successfully canceled',
      rental: { id: rental.id, userId, bikeId, startDate, endDate, status },
      success: true,
    });
  } catch (err) {
    console.error('error in cancelRental:', err);
    return res.status(500).json({ message: 'Server error', error: err.message, success: false });
  }
};
