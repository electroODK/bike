import { addBikeController, getBikesController, updateBikeController, deleteBikeController } from '../controllers/bikes.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import {Router} from "express";

const bikeRoutes = Router()

bikeRoutes.get('/get-bike/:id',authMiddleware, getBikesController); // GET /bikes or /bikes/:id
bikeRoutes.post('/add-bike', authMiddleware, addBikeController); // POST /bikes
bikeRoutes.put('/update-bike/:id', authMiddleware, updateBikeController); // PUT /bikes/:id
bikeRoutes.delete('/delete-bike/:id', authMiddleware, deleteBikeController); // DELETE /bikes/:id

export default bikeRoutes;