import express from 'express';
import {
  createRentalController,
  getRentalByIdController,
  updateRentalStatusController,
  cancelRentalController,
  getUserRentalsController,
} from '../controllers/rental.controller.js';

const rentalRoutes = express.Router();

rentalRoutes.post('/create-rental', createRentalController);

rentalRoutes.get('/get-rental/:id', getRentalByIdController);

rentalRoutes.get('/get-user-rentals/:user_id', getUserRentalsController);

rentalRoutes.patch('/update-rental-status/:id', updateRentalStatusController);

rentalRoutes.patch('/cancel-rental/:id', cancelRentalController);


export default rentalRoutes;
