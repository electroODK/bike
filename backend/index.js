import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/models/index.js';
import bikeRoutes from './src/routes/bike.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import materialRoutes from './src/routes/material.routes.js';
import requestlogger from './src/middleware/requestLogger.js';
import errorHandler from './src/middleware/errorHandler.js';
import httpLogger from './src/middleware/httpLogger.js';
import userRoutes from './src/routes/user.routes.js';
import rentalRoutes from './src/routes/rental.routes.js';
import stationRoutes from './src/routes/station.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/rental", rentalRoutes); 
app.use("/api/bike", bikeRoutes )
app.use("/api/category", categoryRoutes)
app.use("/api/material", materialRoutes)
app.use('/stations', stationRoutes);


const PORT = process.env.PORT || 1488;


app.use(httpLogger);
app.use(requestlogger);
app.use(cors());
app.use(express.json());


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});


app.use(errorHandler);

// Старт
sequelize.sync({ alter: true })
.then(() => {
  console.log('✅ БД подключена и синхронизирована');
  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Ошибка при подключении к БД:', err);
});



