import axios from "axios";

const API_URL = "http://localhost:1488/api"; // адрес бэкенда

// 🔧 экземпляр axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // чтобы отправлялись cookies
});

// ⬆️ interceptor для accessToken
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔄 interceptor для обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.put("/user/refresh-token", {
          refreshToken: localStorage.getItem("refresh_token"),
        });

        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("❌ Ошибка обновления токена:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/"; // редирект на логин
      }
    }

    return Promise.reject(error);
  }
);

//
// ======================
// 🔑 AUTH
// ======================
export const register = async (userData) => {
  const { data } = await api.post("/user/register", userData);
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/user/login", { email, password });
  localStorage.setItem("access_token", data.data.accessToken);
  localStorage.setItem("refresh_token", data.data.refreshToken);
  return data.data;
};

export const logout = async () => {
  await api.post("/user/logout");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const refreshToken = async () => {
  const { data } = await api.put("/user/refresh-token", {
    refreshToken: localStorage.getItem("refresh_token"),
  });
  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("refresh_token", data.refreshToken);
  return data;
};

//
// ======================
// 🚲 RENTAL
// ======================
export const createRental = async (rentalData) => {
  const { data } = await api.post("/rental/create-rental", rentalData);
  return data;
};

export const getRentalById = async (id) => {
  const { data } = await api.get(`/rental/get-rental/${id}`);
  return data;
};

export const getUserRentals = async (userId) => {
  const { data } = await api.get(`/rental/get-user-rentals/${userId}`);
  return data;
};

export const updateRentalStatus = async (id, newStatus) => {
  const { data } = await api.patch(`/rental/update-rental-status/${id}`, {
    status: newStatus,
  });
  return data;
};

export const cancelRental = async (id) => {
  const { data } = await api.patch(`/rental/cancel-rental/${id}`);
  return data;
};

//
// ======================
// 🚲 BIKES
// ======================
export const getBikes = async () => {
  const { data } = await api.get("/bike");
  return data;
};

export const getBikeById = async (id) => {
  const { data } = await api.get(`/bike/${id}`);
  return data;
};

export default api;
