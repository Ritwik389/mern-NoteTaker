import axios from "axios";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api" //in production we don't really know the url so we have to make it dynamic
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
