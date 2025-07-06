# 🚴‍♂️ Bike Rental App

**Stack**: Node.js (Express) | React | PostgreSQL | Docker

## Описание
Приложение для аренды велосипедов с двумя интерфейсами:
- **Публичная часть**: поиск, бронирование, аренда и история заказов.
- **Админ-панель**: управление велосипедами, станциями, арендой и статистикой.

## Установка
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/naumovn808/bike.git
   cd bike

Создайте файл .env в корне и заполните:

DATABASE_URL=postgres://user:pass@localhost:5432/bikedb
JWT_SECRET=your_jwt_secret

Запустите через Docker Compose:

docker-compose up --build

Запуск (локально)

Backend:

cd backend
npm install
npm run dev

Frontend:

cd frontend
npm install
npm start

Откройте http://localhost:3000 для клиента и http://localhost:3000/admin для админки.

Структура проекта

/bike
├── backend                  # Сервер на Node.js (Express)
│   ├── src
│   ├── Dockerfile
│   └── docker-compose.yml
└── frontend                 # Клиент на React
    ├── src
    └── public

Особенности

JWT-аутентификация и роли (user, admin)

REST API с версионированием /api/v1/

Swagger-документация: /api-docs

Unit и e2e тесты (Jest, Cypress)   