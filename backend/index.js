import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/models/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚴 Вело-сервер работает!');
});

const PORT = process.env.PORT || 1488;

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
