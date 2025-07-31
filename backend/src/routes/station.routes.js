import {
  addStationController,
  deleteStationController,
  updateStationController,
  getStationController
} from '../controllers/station.controller.js';

import { authMiddleware } from '../middleware/auth.js';
import { Router } from 'express';

const stationRoutes = Router();

stationRoutes.post('/add-station', authMiddleware, addStationController);         // POST /stations/add-station
stationRoutes.get('/get-station/:id', authMiddleware, getStationController);      // GET /stations/get-station/:id
stationRoutes.put('/update-station/:id', authMiddleware, updateStationController); // PUT /stations/update-station/:id
stationRoutes.delete('/delete-station/:id', authMiddleware, deleteStationController); // DELETE /stations/delete-station/:id

export default stationRoutes;
