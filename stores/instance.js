import axios from "axios";
import io from "socket.io-client";

// stores
import { baseURL } from "./baseURL";

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
});

export const socket = io.connect(baseURL);
