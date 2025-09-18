import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  
  useEffect(() => {
    fetchPostAndComments();
  }, [id]);
  
  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      
      // Récupérer les détails du post
      const postResponse = await apiService.getPostById(id);
      setPost(postResponse.data);
      
      // Récupérer les commentaires du post
      const commentsResponse = await apiService.getPostComments(id);
      setComments(commentsResponse.data);
      
      setError("");
    } catch (err) {
      console.error("Erreur:", err);
      
      let errorMessage = "Une erreur est survenue lors du chargement des données.";
      
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = "Post introuvable.";
        } else if (err.response.data && err.response.data.detail) {
          errorMessage = err.response.data.detail;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate("/login");
      return;
    }
    
    if (!newComment.trim()) {
      setCommentError("Le commentaire ne peut pas être vide");
      return;
    }
    
    try {
      setCommentLoading(true);
      await apiService.addComment(id, newComment);
      
      // Rafraîchir les commentaires
      const commentsResponse = await apiService.getPostComments(id);
      setComments(commentsResponse.data);
      
      // Réinitialiser le formulaire
      setNewComment("");
      setCommentError("");
    } catch (err) {
      setCommentError(
        err.response?.data?.detail || 
        "Une erreur est survenue lors de l'ajout du commentaire."
      );
    } finally {
      setCommentLoading(false);
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
        <div className="mt-4">
          <Link 
            to="/"
            className="text-indigo-600 hover:text-indigo-900"
          >
            ← Retour à la liste des posts
          </Link>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <p className="text-gray-500">Post introuvable.</p>
        <div className="mt-4">
          <Link 
            to="/"
            className="text-indigo-600 hover:text-indigo-900"
          >
            ← Retour à la liste des posts
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link 
          to="/"
          className="text-indigo-600 hover:text-indigo-900"
        >
          ← Retour à la liste des posts
        </Link>
      </div>
      
      <article className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Par {post.author_username} • {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
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
        </div>
      </article>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Commentaires ({comments.length})</h2>
        
        {currentUser ? (
          <form onSubmit={handleAddComment} className="mb-6">
            <div>
              <label htmlFor="comment" className="sr-only">Ajouter un commentaire</label>
              <textarea
                id="comment"
                rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Ajouter un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
            
            {commentError && (
              <div className="mt-2 text-red-600 text-sm">
                {commentError}
              </div>
            )}
            
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={commentLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {commentLoading ? "Envoi..." : "Commenter"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-gray-700">
              <Link to="/login" className="text-indigo-600 hover:text-indigo-900 font-medium">
                Connectez-vous
              </Link>{" "}
              pour ajouter un commentaire.
            </p>
          </div>
        )}
        
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucun commentaire pour l'instant.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-md shadow">
                <div className="flex justify-between">
                  <span className="font-medium">{comment.user_username}</span>
                  <span className="text-gray-500 text-sm">{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail; 