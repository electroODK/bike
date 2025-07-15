import Bike from "../models/bike.js";

export const addBikeController = async (req, res) => {
  try {
    const {
      name,
      price,
      size,
      category_id,
      information,
      photo,
      material_id,
      diametr,
      number_of_velocities,
      is_amortising,
      status
    } = req.body;

    if (!name || !price || !size || !category_id || !photo || !material_id) {
      return res.status(400).json({
        message: "Please fill in all required fields",
        error: true,
        success: false,
      });
    }

    if (price <= 0 || (diametr && diametr <= 0) || (number_of_velocities && number_of_velocities < 0)) {
      return res.status(400).json({
        message: "Numeric values must be positive",
        error: true,
        success: false,
      });
    }

    const newBike = await Bike.create({
      name,
      price,
      size,
      category_id,
      information: information || null,
      photo: Array.isArray(photo) ? photo : [],
      material_id,
      diametr: diametr || null,
      number_of_velocities: number_of_velocities || null,
      is_amortising: !!is_amortising,
      status: status || "available"
    });

    return res.status(200).json({
      message: "Bike created successfully",
      data: newBike.toJSON(),
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error creating bike",
      error: true,
      success: false,
    });
  }
};

// 📌 Обновление велосипеда
export const updateBikeController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      size,
      category_id,
      information,
      photo,
      material_id,
      diametr,
      number_of_velocities,
      is_amortising,
      status
    } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Please provide bike's id",
        error: true,
        success: false,
      });
    }

    const bike = await Bike.findByPk(id);
    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
        error: true,
        success: false,
      });
    }

    await bike.update({
      name: name ?? bike.name,
      price: price ?? bike.price,
      size: size ?? bike.size,
      category_id: category_id ?? bike.category_id,
      information: information ?? bike.information,
      photo: photo !== undefined ? (Array.isArray(photo) ? photo : []) : bike.photo,
      material_id: material_id ?? bike.material_id,
      diametr: diametr ?? bike.diametr,
      number_of_velocities: number_of_velocities ?? bike.number_of_velocities,
      is_amortising: is_amortising !== undefined ? !!is_amortising : bike.is_amortising,
      status: status ?? bike.status,
    });

    return res.status(200).json({
      message: "Bike updated successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating bike",
      error: true,
      success: false,
    });
  }
};

// 📌 Удаление велосипеда
export const deleteBikeController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Please provide bike's id",
        error: true,
        success: false,
      });
    }

    const bike = await Bike.findByPk(id);
    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
        error: true,
        success: false,
      });
    }

    await bike.destroy();

    return res.status(200).json({
      message: "Bike deleted successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting bike",
      error: true,
      success: false,
    });
  }
};

// 📌 Получение списка всех велосипедов / одного
export const getBikesController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    if (id) {
      const bike = await Bike.findByPk(id);
      if (!bike) {
        return res.status(404).json({
          message: "Bike not found",
          error: true,
          success: false,
        });
      }

      return res.status(200).json({
        message: "Bike retrieved successfully",
        data: bike.toJSON(),
        error: false,
        success: true,
      });
    }

    const where = {};
    if (status) where.status = status;

    const bikes = await Bike.findAll({ where });

    return res.status(200).json({
      message: "Bikes retrieved successfully",
      data: bikes.map((b) => b.toJSON()),
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving bikes",
      error: true,
      success: false,
    });
  }
};
