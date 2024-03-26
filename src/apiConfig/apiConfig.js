import axios from "axios";


export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
// export const API_BASE_URL = "http://localhost:5000"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});