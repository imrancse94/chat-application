
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BASE_URL;; // Replace with your backend socket server URL

// Create and export the socket instance
const socket = io(SOCKET_URL);

export default socket;
