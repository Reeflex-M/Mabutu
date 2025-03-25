import axios from "axios";
import authService from "./auth.service";

const API_URL = "http://localhost:8000/";

// Fonction pour obtenir le token JWT actuel
const getAuthToken = () => {
  const user = authService.getCurrentUser();
  return user?.access;
};

// Création d'une instance axios avec configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token aux requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour récupérer les informations de l'utilisateur connecté
const getUserInfo = async () => {
  return apiClient.get("customer/auth/user/");
};

const apiService = {
  getUserInfo,
};

export default apiService; 