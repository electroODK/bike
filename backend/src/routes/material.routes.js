import { addMaterialController, getMaterialController , updateMaterialController, deleteMaterialController } from "../controllers/material.controller.js";
import { Router} from "express";
import { authMiddleware } from "../middleware/auth.js";

const materialRoutes =  Router()

materialRoutes.delete('/delete-material/:id',authMiddleware, deleteMaterialController);
materialRoutes.post('/add-material', authMiddleware, addMaterialController);
materialRoutes.put('/update-material/:id', authMiddleware, updateMaterialController);
materialRoutes.get('/get-material/:id', authMiddleware, getMaterialController);

export default materialRoutes;