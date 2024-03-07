import axios from "axios";
const API_URL = "https://admindashboard-backend-2.onrender.com";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",

});

export 