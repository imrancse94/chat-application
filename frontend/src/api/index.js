import axios from "axios";
// import useAuth from "@/hooks/useAuth";
import { removeToken } from "@/helpers/token";
import { getToken } from "../helpers";

// const {auth,setAuth} = useAuth()

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL
});

