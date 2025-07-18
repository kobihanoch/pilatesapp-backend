import { createServer } from "http";
import { Server } from "socket.io";
import {
  getOnlineUsersConnected,
  removeASocketConnection,
  setNewSocketConnection,
} from "../utils/socketUtils.js";

const userSockets = new Map();

export const createIOServer = (app) => {
  const server = createServer(app);
  return {
    io: new Server(server, {
      cors: {
        origin:
          process.env.NODE_ENV === "development" ? "*" : "<FrontDomainURL>",
        methods: ["GET", "POST"],
        credentials: true,
      },
    }),
    server: server,
  };
};

export const startSocket = async (io) => {
  io.on("connection", (socket) => {
    console.log(
      "A new socket connection.",
      Date(),
      "\nCurrently there are",
      Number(getOnlineUsersConnected() + 1),
      "connections open."
    );

    // On auth
    socket.on("user_connected", (userId) => {
      setNewSocketConnection(userId, socket.id);
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
