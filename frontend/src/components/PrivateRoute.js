import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/auth.service";

// Composant qui protège les routes nécessitant une authentification
const PrivateRoute = () => {
  const isAuthenticated = authService.isAuthenticated();
  
  // Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion
  // Sinon, on affiche les composants enfants de la route
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 