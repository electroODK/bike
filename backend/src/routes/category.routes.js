import { addCategoryController, getCategoryController, deleteCategoryController, updateCategoryController } from "../controllers/category.controller.js";
import { Router} from "express";
import { authMiddleware } from "../middleware/auth.js";

const categoryRoutes =  Router()

categoryRoutes.delete('/delete-category/:id',authMiddleware, deleteCategoryController);
categoryRoutes.post('/add-category', authMiddleware, addCategoryController);
categoryRoutes.put('/update-category/:id', authMiddleware, updateCategoryController);
categoryRoutes.get('/get-category/:id', authMiddleware, getCategoryController)

export default categoryRoutes;