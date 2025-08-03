// src/api/auth.js (ВРЕМЕННАЯ ЗАГЛУШКА)

// Имитируем задержку ответа от сервера
const fakeNetworkDelay = (ms) => new Promise(res => setTimeout(res, ms));

// Функция для входа
export const login = async (email, password) => {
    await fakeNetworkDelay(1000); // Имитируем загрузку

    if (email === 'test@test.com' && password === '12345') {
        console.log('API (заглушка): Вход успешен!');
        return {
            token: 'fake-jwt-token-for-testing',
            user: { name: 'Тестовый Пользователь', email: 'test@test.com' }
        };
    } else {
        console.error('API (заглушка): Неверный email или пароль');
        throw new Error('Неверный email или пароль');
    }
};

// Функция для регистрации
export const register = async (formData) => {
    await fakeNetworkDelay(1500);

    console.log('API (заглушка): Регистрация успешна с данными:', formData);
    return { message: 'Регистрация прошла успешно' };
};