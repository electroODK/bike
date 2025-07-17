import Material from '../models/material.js';
import Bike from '../models/bike.js';

export const addMaterialController = async (req, res) => {
  try {
    const { name, information } = req.body;

    if (!name) {
      res.status(400).json({
        message: 'Name of material is required',
        error: true,
        success: false,
      });
    }
    const newMaterial = await Material.create({
      name: name,
      information: information ? information : null,
    });

    return res.status(200).json({
      message: 'Material added successfully',
      data: newMaterial.toJSON(),
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error adding material',
      error: true,
      success: false,
    });
  }
};

export const deleteMaterialController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Material's id is required",
        error: true,
        success: false,
      });
    }

    const material = await Material.findByPk(id);

    if (!material) {
      res.status(404).json({
        message: 'Material not found',
        error: true,
        success: false,
      });
    }

    const bikeCount = await Bike.count({ where: { material_id: id } });

    if (bikeCount > 0) {
      return res.status(400).json({
        message: `${bikeCount} bike(s) consist(s) of this material!`,
        error: true,
        success: false,
      });
    }
    await material.destroy();

    res.status(200).json({
      message: 'Material deleted successfully',
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting material',
      error: true,
      success: false,
    });
  }
};

export const updateMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, information } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Material's id is required",
        error: true,
        success: false,
      });
    }

    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({
        message: 'Material not found',
        error: true,
        success: false,
      });
    }

    await material.update({
      name: name ?? material.name,
      information: information ?? material.information,
    });

    return res.status(200).json({
      message: 'Material updated successfully', // Fixed from 'Bike updated successfully'
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error updating material',
      error: true,
      success: false,
    });
  }
};

export const getMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Material's id is required",
        error: true,
        success: false,
      });
    }

    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({
        message: 'Material not found',
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      data: material.toJSON(),
      message: 'Material retrieved successfully',
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving material',
      error: true,
      success: false,
    });
  }
};