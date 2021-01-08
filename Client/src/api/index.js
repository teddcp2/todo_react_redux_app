import axios from "axios";
import { BACKEND_URL } from "../config";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Access-Control-Allw-Origin": "*", 'Content-Type': 'application/json' }
});
