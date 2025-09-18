import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api.service";
import { useAuth } from "../context/AuthContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { currentUser, isAdmin } = useAuth();
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      const response = await apiService.getPosts();
      setPosts(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des posts:", err);
      
      // Message d'erreur plus explicite
      let errorMessage = "Impossible de charger les posts. Veuillez réessayer plus tard.";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Non autorisé. Vous devez être connecté pour voir les posts.";
        } else if (err.response.status === 404) {
          errorMessage = "Ressource introuvable. Vérifiez l'URL de l'API.";
        } else if (err.response.data && err.response.data.detail) {
          errorMessage = err.response.data.detail;
        }
      } else if (err.request) {
        errorMessage = "Impossible de joindre le serveur. Vérifiez votre connexion.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
        <div className="mt-4 text-center">
          <Link 
            to="/login"
            className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <p className="text-gray-500">Aucun post disponible pour le moment.</p>
        {isAdmin && (
          <Link 
            to="/create-post"
            className="mt-4 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Créer votre premier post
          </Link>
        )}
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        {isAdmin && (
          <Link 
            to="/create-post"
            className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Nouveau post
          </Link>
        )}
      </div>
      
      <div className="space-y-10">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
          >
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Par {post.author_username} • {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              {/* Afficher seulement les 5 premières lignes du contenu */}
              <p className="text-gray-700 line-clamp-5">
                {post.content}
              </p>
              
              <div className="mt-4">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Lire la suite →
                </Link>
              </div>
            </div>
            
            <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
              <div className="flex space-x-4">
                <span className="inline-flex items-center text-sm">
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    disabled={!currentUser}
                  >
                    <span className="mr-1">👍</span> 0
                  </button>
                </span>
                <span className="inline-flex items-center text-sm">
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    disabled={!currentUser}
                  >
                    <span className="mr-1">❤️</span> 0
                  </button>
                </span>
                <span className="inline-flex items-center text-sm">
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    disabled={!currentUser}
                  >
                    <span className="mr-1">😂</span> 0
                  </button>
                </span>
              </div>
              
              <span className="text-sm text-gray-500">
                0 commentaires
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList; 