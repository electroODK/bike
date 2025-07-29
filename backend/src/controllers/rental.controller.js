import { Rental, RentalBike, Bike, Station } from '../models/index.js';
import { Op } from 'sequelize';

// 📌 Создание аренды
export const createRentalController = async (req, res) => {
  try {
    const { user_id, start_station_id, end_station_id, start_date, end_date, bikes } = req.body;

    if (!user_id || !start_station_id || !start_date || !end_date || !Array.isArray(bikes) || bikes.length === 0) {
      return res.status(400).json({
        message: "Required fields missing or invalid",
        error: true,
        success: false,
      });
    }

    // ⏱ Проверка занятости байков
    for (const { bike_id } of bikes) {
      const overlappingRental = await Rental.findOne({
        include: [{
          model: Bike,
          as: 'bikes',
          where: { id: bike_id }
        }],
        where: {
          [Op.or]: [
            {
              start_date: { [Op.between]: [start_date, end_date] }
            },
            {
              end_date: { [Op.between]: [start_date, end_date] }
            },
            {
              start_date: { [Op.lte]: start_date },
              end_date: { [Op.gte]: end_date }
            }
          ],
          status: { [Op.in]: ['active', 'reserved'] }
        }
      });

      if (overlappingRental) {
        return res.status(409).json({
          message: `Bike with ID ${bike_id} is already rented for selected dates.`,
          error: true,
          success: false,
        });
      }
    }

    // 💰 Расчет полной стоимости
    const totalPrice = await bikes.reduce(async (accPromise, bikeItem) => {
      const acc = await accPromise;
      const bike = await Bike.findByPk(bikeItem.bike_id);
      const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 3600 * 24)) || 1;
      return acc + (bike.price * days);
    }, Promise.resolve(0));

    const rental = await Rental.create({
      user_id,
      start_station_id,
      end_station_id: end_station_id || null,
      start_date,
      end_date,
      price: totalPrice,
    });

    // 🧢 Создание записей RentalBike
    for (const bikeItem of bikes) {
      await RentalBike.create({
        rental_id: rental.id,
        bike_id: bikeItem.bike_id,
        is_helmet: !!bikeItem.is_helmet,
        is_torch: !!bikeItem.is_torch,
        is_lock: !!bikeItem.is_lock,
      });
    }

    return res.status(201).json({
      message: 'Rental created successfully',
      data: { rental_id: rental.id },
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal error while creating rental',
      error: true,
      success: false,
    });
  }
};

// 📌 Получение всех аренд юзера
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
          through: {
            attributes: ['is_helmet', 'is_torch', 'is_lock']
          }
        }
      ],
      order: [['start_date', 'DESC']]
    });

    return res.status(200).json({
      message: 'Rentals fetched successfully',
      data: rentals,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error fetching rentals',
      error: true,
      success: false,
    });
  }
};

// 📌 Получение одной аренды
export const getRentalByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findByPk(id, {
      include: [
        { model: Station, as: 'start_station' },
        { model: Station, as: 'end_station' },
        {
          model: Bike,
          as: 'bikes',
          through: {
            attributes: ['is_helmet', 'is_torch', 'is_lock']
          }
        }
      ]
    });

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Rental retrieved successfully",
      data: rental,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving rental",
      error: true,
      success: false,
    });
  }
};

// 📌 Обновление статуса аренды (для админа)
export const updateRentalStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'finished', 'cancelled'].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        error: true,
        success: false,
      });
    }

    const rental = await Rental.findByPk(id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
        error: true,
        success: false,
      });
    }

    await rental.update({ status });

    return res.status(200).json({
      message: "Rental status updated",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating status",
      error: true,
      success: false,
    });
  }
};
// 📌 Отмена аренды
export const cancelRentalController = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findByPk(id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
        error: true,
        success: false,
      });
    }

    // Проверка: уже началась?
    const now = new Date();
    if (new Date(rental.start_date) <= now) {
      return res.status(400).json({
        message: "Cannot cancel a rental that has already started",
        error: true,
        success: false,
      });
    }

    if (!['reserved', 'active'].includes(rental.status)) {
      return res.status(400).json({
        message: "Only active or reserved rentals can be cancelled",
        error: true,
        success: false,
      });
    }

    await rental.update({ status: 'cancelled' });

    return res.status(200).json({
      message: "Rental cancelled successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error cancelling rental",
      error: true,
      success: false,
    });
  }
};
