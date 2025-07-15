import { addBikeController, getBikesController, updateBikeController, deleteBikeController } from '../controllers/bikes.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import {Router} from "express";

const bikeRouters = Router()

bikeRouters.get('/bikes/:id',authMiddleware, getBikesController); // GET /bikes or /bikes/:id
bikeRouters.post('/bikes', authMiddleware, addBikeController); // POST /bikes
bikeRouters.put('/bikes/:id', authMiddleware, updateBikeController); // PUT /bikes/:id
bikeRouters.delete('/bikes/:id', authMiddleware, deleteBikeController); // DELETE /bikes/:id

export default bikeRouters;