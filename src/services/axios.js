import axios from "axios";

/**
 * Instance axios unique pour toute l'application.
 * Base URL injectée depuis .env (Vite).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optionnel : 10s
});

/**
 * Intercepteur de requêtes
 * (Ex. ajout futur d'un token d'auth, d'headers communs, logs…)
 */
api.interceptors.request.use(
  (config) => {
    // Exemple (plus tard) :
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Intercepteur de réponses
 * (Gestion centralisée des erreurs réseau, redirections 401, messages UX…)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Exemple : logging, normalisation d'erreur
    // console.error("[API ERROR]", error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default api;