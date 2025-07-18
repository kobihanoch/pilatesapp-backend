import { createServer } from "http";
import { Server } from "socket.io";
import {
  getOnlineUsersConnected,
  removeASocketConnection,
  setNewSocketConnection,
} from "../utils/socketUtils.js";

export let io = null;

export const createIOServer = (app) => {
  const server = createServer(app);
  io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === "development" ? "*" : "<FrontDomainURL>",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  return { io, server };
};

export const startSocket = async () => {
  io.on("connection", (socket) => {
    console.log(
      "A new socket connection.",
      Date(),
      "\nCurrently there are",
      Number(getOnlineUsersConnected() + 1),
      "connections open."
    );

    // On auth
    socket.on("user_loggedin", (userId) => {
      setNewSocketConnection(userId, socket.id);
      socket.join(userId); // Creates a unqiue room for comuunication, key is user ID
      console.log("New user connected:", userId);
    });

    // On disconnection
    socket.on("disconnect", () => {
      removeASocketConnection(socket.id);
      console.log(
        "A socket disconnected. Currently there are",
        getOnlineUsersConnected(),
        " connections open."
      );
    });
  });
};
