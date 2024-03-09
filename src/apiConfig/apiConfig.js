import axios from "axios";


export const API_BASE_URL = "https://admindashboard-backend-2.onrender.com";
// export const API_BASE_URL = "http://localhost:5454"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {

        "Content-Type": "application/json"
    }
});