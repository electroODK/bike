import Station from "../models/station.js";
import Bike from "../models/bike.js";

export const addStationController = async (req, res) =>{
    try{
        const {name , location, capacity} = req.body
        if (!name || !location){
            res.status(400).json({
                message: "Fill in all required fields",
                error: true,
                success: false
            })
        }
        if (capacity){
            if (capacity>0){
                return res.status(404).json({
                    message: "Capacity must be positive",
                    error: true,
                    success: false
                })
            }
        }   
        
        const newStation= await Station.create({
            name: name,
            location : location,
            capacity: capacity ? capacity : null
        })

        return res.status(200).json({
            message: "Station added successfully",
            data: newStation.toJSON(),
            error: false,
            success: true
        })
    } catch(err) {
        return res.status(500).json({
            message: "Error adding station",
            error: true,
            success: false
        })
    }
};

export const deleteStationController = async(req, res) =>{
    try{
        const {id} = req.params

        if (!id){
            res.status(400).json({
                message: "Station's id is required",
                error: true,
                success: false
            })
        }

        const station = await Station.findByPk(id);

        if (!station) {
            res.status(404).json({
                message: "Station not found",
                error: true,
                success: false
            })
        }

        const bikeCount = await Bike.count({ where: { station_id: id } });

        if (bikeCount > 0) {
          return res.status(400).json({
            message: `Station is in use with ${bikeCount} bike(s)!`,
            error: true,
            success: false,
          });
        }
        await station.destroy()

        res.status(200).json({
            message: "Station deleted successfully",
            error: false,
            success: true
        })
    } catch(err){
        res.status(500).json({
            message: "Error deleting station",
            error: true,
            success: false
        })
    }
}

export const updateStationController = async (req, res) => {
  try {
    const { id } = req.params;
    const {name, location, capacity} = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Station's id is required",
        error: true,
        success: false,
      });
    }

    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({
        message: "Station not found",
        error: true,
        success: false,
      });
    }
    const bikeCount = await Bike.count({ where: { station_id: id } });

    if (bikeCount>capacity){
        return res.status(400).json({
        message: "New capacity can not be smaller current bikes' count",
        error: true,
        success: false,
      });
    }
    await station.update({
      name: name ?? station.name,
      location: location ?? station.location,
      capacity: capacity ?? station.capacity
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

export const getStationController = async(req,res) =>{
  try{ 
    const {id} = req.params
    if(!id){
      return res.status(400).json({
        message: "Station's id is required",
        error: true,
        success: false
      })
    }

    const station = await Station.findByPk(id)

    if (!station){
      return res.status(404).json({
        message: "Station not found",
        error:true,
        success: false
      })
    }

    return res.status(200).json({
      data: station.toJSON(),
      message: "Station retrieved successfully",
      error:false,
      success: true
    })
  } catch(err){
    return res.status(500).json({
      message: "Error retrieving station",
      error:true,
      success: false
    })
  }
}