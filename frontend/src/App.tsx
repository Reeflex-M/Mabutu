import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PrivateRoute from "./components/PrivateRoute";

import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser, loading, logout, isAdmin } = useAuth();
  
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-white font-bold text-xl">Mabutu</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Accueil
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Profil
                    </Link>
                    
                    {/* Lien de création de post seulement pour les administrateurs */}
                    {isAdmin && (
                      <Link
                        to="/create-post"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Créer un post
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {currentUser ? (
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-300">
                        {currentUser.username}
                        {isAdmin && <span className="ml-1 text-yellow-400">(Admin)</span>}
                      </span>
                      <button
                        onClick={logout}
                        className="text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Déconnexion
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        S'inscrire
                      </Link>
                      <Link
                        to="/login"
                        className="text-white bg-indigo-600 hover:bg-indigo-700 ml-2 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Se connecter
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-post" element={<CreatePost />} />
              </Route>
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
