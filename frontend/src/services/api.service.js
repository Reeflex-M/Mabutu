import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

// Configuration Axios avec intercepteur pour ajouter le header d'authentification
const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authHeader();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Posts API
const getPosts = () => {
  return apiClient.get("api/posts/");
};

const getPostById = (id) => {
  return apiClient.get(`api/posts/${id}/`);
};

const createPost = (data) => {
  return apiClient.post("api/posts/", data);
};

const updatePost = (id, data) => {
  return apiClient.put(`api/posts/${id}/`, data);
};

const deletePost = (id) => {
  return apiClient.delete(`api/posts/${id}/`);
};

// Commentaires API
const getPostComments = (postId) => {
  return apiClient.get(`api/posts/${postId}/comments/`);
};

const addComment = (postId, content) => {
  return apiClient.post(`api/posts/${postId}/comments/`, { content });
};

const apiService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
  addComment,
};

export default apiService; 