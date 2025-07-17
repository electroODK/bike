import Category from "../models/category.js";
import Bike from "../models/bike.js";
export const addCategoryController = async (req, res) =>{
    try{
        const {name , information} = req.body

        if (!name){
            res.status(400).json({
                message: "Name of category is required",
                error: true,
                success: false
            })
        }
        const newCategory= await Category.create({
            name: name,
            information: information ? information : null
        })

        return res.status(200).json({
            message: "Category added successfully",
            data: newCategory.toJSON(),
            error: false,
            success: true
        })
    } catch(err) {
        return res.status(500).json({
            message: "Error adding category",
            error: true,
            success: false
        })
    }
};

export const deleteCategoryController = async(req, res) =>{
    try{
        const {id} = req.params

        if (!id){
            res.status(400).json({
                message: "Category's id is required",
                error: true,
                success: false
            })
        }

        const category = await Category.findByPk(id);

        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
                success: false
            })
        }

        const bikeCount = await Bike.count({ where: { category_id: id } });

        if (bikeCount > 0) {
          return res.status(400).json({
            message: `Category is in use with ${bikeCount} bike(s)!`,
            error: true,
            success: false,
          });
        }
        await category.destroy()

        res.status(200).json({
            message: "Category deleted successfully",
            error: false,
            success: true
        })
    } catch(err){
        res.status(500).json({
            message: "Error deleting category",
            error: true,
            success: false
        })
    }
}

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const {name, information  } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Category's id is required",
        error: true,
        success: false,
      });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    await category.update({
      name: name ?? category.name,
      information: information ?? category.information
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

export const getCategoryController = async(req,res) =>{
  try{ 
    const {id} = req.params
    if(!id){
      return res.status(400).json({
        message: "Category's id is required",
        error: true,
        success: false
      })
    }

    const category = await Category.findByPk(id)

    if (!category){
      return res.status(404).json({
        message: "Category not found",
        error:true,
        success: false
      })
    }

    return res.status(200).json({
      data: category.toJSON(),
      message: "Category retrieved successfully",
      error:false,
      success: true
    })
  } catch(err){
    return res.status(500).json({
      message: "Error retrieving category",
      error:true,
      success: false
    })
  }
} 