import axios from "axios";

const API_URL = "http://localhost:8000/";

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "api/token/", {
      username,
      password,
    });
    
    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    
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

const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  isAuthenticated
};

export default authService; 