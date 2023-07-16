import axios from "axios";

// const BASE_URL = import.meta.env.API_URL;

const api = axios.create({
    baseURL: "https://localhost:7015/api"
});

// api.interceptors.request.use((config) => {
//
//     const jwtJson
//
//     return config;
// })

export default api;