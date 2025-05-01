import io from "socket.io-client";
import { BASE_URL, FRONTEND_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(FRONTEND_URL, {
      transports: ["websocket"],
    });
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
