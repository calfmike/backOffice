import axios from 'axios';

// Configura la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Asegúrate de que la URL coincida con la de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptores de solicitud y respuesta para manejar tokens, errores, etc.
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
