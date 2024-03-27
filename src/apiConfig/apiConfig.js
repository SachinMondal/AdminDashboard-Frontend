import axios from "axios";


export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});