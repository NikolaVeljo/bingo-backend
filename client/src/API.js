import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_NODE_ENV === "production" ? "https://bingo-frontend-iku9k.ondigitalocean.app/api/" : "http://localhost:8888/api/",
    withCredentials: true,
    headers: {
        Accepted: 'appication/json',
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(
    (config) => {
        const csrf = localStorage.getItem('csrf');
        if (csrf) {
            config.headers['x-csrf-token'] = csrf;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default API;