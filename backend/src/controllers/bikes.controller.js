import {Bike } from "../models/bike"

export const addBikeController = async (req, res) => {
    try{
        const {name, price, size , category_id, information, photo, material_id, diametr, number_of_velocities, is_amortising, is_rented} = req.body

        if (!name || !price || !size || !category_id || !information || !photo || !material_id || !is_amortising || !is_rented){
            res.status(400).json({
                message:"Please fill in all fields",
                error: true,
                success: false
            })
        }
        
        if (price<=0 && diametr<=0 && number_of_velocities<0){
            res.status().json({
                message:"Integer values can not be negative",
                error: true,
                success: false
            })
        }

        const newBike = await Bike.create({
            name,
            price,
            size,
            category_id,
            information: information || null, // Allow empty information
            photo: Array.isArray(photo) ? photo : [], // Ensure photo is an array
            material_id: material_id || null,
            diametr: diametr || null, // Allow null if not provided
            number_of_velocities: number_of_velocities || null, // Allow null if not provided
            is_amortising: !!is_amortising, // Convert to boolean
            is_rented: !!is_rented, // Convert to boolean
        });

        return res.status(200).json({
            message: "Bike created successfully",
            data: newBike.toJSON(),
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating bike",
            error: true,
            success: false
        })
    }
}

export const updateBikeController = async(req, res) => {
    try{

        const {id}= req.params
        
        if (!id) {
            return res.status(400).json({
                message: "Please provide bike's id",
                error: true,
                success: false
            })
        }
        const bike = await Bike.findByPk(id)
        
        if (!bike){
            return res.status(404).json({
                message: "Bike not found",
                error: true,
                success: false
            })
        }

        await bike.update({
            name: name || bike.name,
            price: price || bike.price,
            size: size || bike.size,
            category_id: category_id !== undefined ? category_id : bike.category_id,
            information: information !== undefined ? information : bike.information,
            photo: photo !== undefined ? (Array.isArray(photo) ? photo : []) : bike.photo,
            material_id: material_id !== undefined ? material_id : bike.material_id,
            diametr: diametr !== undefined ? diametr : bike.diametr,
            number_of_velocities: number_of_velocities !== undefined ? number_of_velocities : bike.number_of_velocities,
            is_amortising: is_amortising !== undefined ? !!is_amortising : bike.is_amortising,
            is_rented: is_rented !== undefined ? !!is_rented : bike.is_rented,
        });

        return res.status(200).json({
            message: "Bike updated successfully",
            error: false, 
            success: true
        })
    } catch(err) {
        return res.status(500).json({
            message: "Error updating bike",
            error: true,
            success: false
        })
    }
}

export const deleteBikeController = async(req,res) =>{
    try{
        const {id} = req.params

        if (!id) {
            return res.status(400).json({
                message: "Please provide bike's id",
                error: true,
                success: false
            })
        }

        const bike = await Bike.findByPk(id)

        if (!bike){
            return res.status(500).json({
                message: "Bike not found",
                error: true,
                success: false
            })
        }

        await bike.destroy();

        return res.status(200).json({
            message: "Bike deleted successfully",
            error: false,
            success: true
        })
    } catch(err){
        return res.status(500).json({
            message: "Error deleting bike",
            error: true,
            success: false
        })
    }
}

import { Bike } from "../models/bike";

export const getBikesController = async (req, res) => {
  try {
    const { id } = req.params; // For GET /bikes/:id
    const { is_rented } = req.query; // For filtering, e.g., ?is_rented=false

    // Handle single bike by ID
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Please provide bike's id ",
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

      return res.status(200).json({
        message: "Bike retrieved successfully",
        data: bike.toJSON(),
        error: false,
        success: true,
      });
    }

    // Handle all bikes with optional filtering
    const where = {};
    if (is_rented !== undefined) {
      where.is_rented = is_rented === 'true'; // Convert query string to boolean
    }

    const bikes = await Bike.findAll({ where });

    return res.status(200).json({
      message: "Bikes retrieved successfully",
      data: bikes.map(bike => bike.toJSON()),
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

