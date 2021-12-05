import axios from "axios";

// Yousef
// export const baseURL = "http://192.168.8.128:8000";

// Fahad
export const baseURL = "http://192.168.1.75:8000";

// Faisal
// export const baseURL = "http://192.168.8.101:8000";

// Salim
// export const baseURL = "http://192.168.8.109:8000";

export const instance = axios.create({
	baseURL: `${baseURL}/api`,
});
