import io from "socket.io-client";
import { SOCKET } from "../constants/Endpoints";

console.log("Creating socket connection...");
const socket = io(SOCKET);

const useSocket = () => {
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  // Listen for events from the server
  socket.on("serverEvent", (data) => {
    console.log("Received from server:", data);
  });
  return socket;
};

export { useSocket };
