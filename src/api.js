// src/api.js
import axios from "axios";

// axios.create gets the .get, post, put, patch, delete methods
const api = axios.create({
 	baseURL: import.meta.env.VITE_API_URL
 })

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");

	if(token){
		// add the token to the AUTH (as seen in postman) 
		config.headers.Authorization = `Bearer ${token}`
	}

	return config;
})

export default api;