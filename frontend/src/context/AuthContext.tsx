import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import authService from '../services/auth.service';

// Interface utilisateur
export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  access: string;
  refresh: string;
}

// Interface du contexte d'authentification
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAdmin: boolean;
}

// Propriétés du fournisseur
interface AuthProviderProps {
  children: ReactNode;
}

// Créer le contexte d'authentification
const AuthContext = createContext<AuthContextType | null>(null);

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger les informations utilisateur au démarrage
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Vérifier s'il y a un utilisateur dans le localStorage
        const user = authService.getCurrentUser();
        
        if (user) {
          // Rafraîchir les informations utilisateur depuis le serveur
          const refreshedUser = await authService.refreshUserInfo();
          setCurrentUser(refreshedUser as User);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des informations utilisateur:", err);
        setError("Impossible de charger les informations utilisateur.");
      } finally {
        setLoading(false);
      }
    };
    
    loadUserInfo();
  }, []);

  // Fonction de connexion
  const login = async (username: string, password: string): Promise<User | null> => {
    try {
      setLoading(true);
      setError("");
      
      const user = await authService.login(username, password);
      setCurrentUser(user as User);
      return user as User;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || "Échec de la connexion. Vérifiez vos identifiants.";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Valeur exposée par le contexte
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    login,
    logout,
    isAdmin: currentUser?.is_staff || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};

export default AuthContext; 