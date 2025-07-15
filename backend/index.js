import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/models/index.js';
import bikeRouters from './src/routes/bikes.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/bike", bikeRouters )

const PORT = process.env.PORT || 1488;

app.get('/', (req, res) => {
  res.send('🚴 Вело-сервер работает!');
});

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
