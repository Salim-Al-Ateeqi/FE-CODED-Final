import axios from "axios";
import { baseURL } from "./baseURL";

export const instance = axios.create({
	baseURL: `${baseURL}/api`,
});
