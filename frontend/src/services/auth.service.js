import axios from "axios";

const API_URL = "http://localhost:8000/";

// Fonction pour récupérer les informations utilisateur
const getUserInfo = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    const token = user.access;
    
    const response = await axios.get(API_URL + "api/auth/user/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Fusionner les données JWT avec les informations utilisateur
    const updatedUser = {
      ...user,
      ...response.data
    };
    
    // Mettre à jour le stockage local
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos utilisateur:", error);
    return null;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "api/token/", {
      username,
      password,
    });
    
    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Récupérer les informations utilisateur après connexion
      return await getUserInfo();
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_URL + "api/auth/register/", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

const refreshUserInfo = async () => {
  return await getUserInfo();
};

const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};

const authService = {
  login,
  logout,
  register,
  getCurrentUser,
  refreshUserInfo,
  isAuthenticated
};

export default authService; 