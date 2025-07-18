import { getIO } from "../config/webSocket.js";

const userSockets = new Map();

export const setNewSocketConnection = (userId, socketId) => {
  userSockets.set(userId, socketId);
};

export const removeASocketConnection = (socketId) => {
  // Remove socket from user sockets map
  for (const [userId, sId] of userSockets.entries()) {
    if (sId === socketId) userSockets.delete(userId);
  }
};

export const sendServerMessageToUser = async (userId, message) => {
  const io = getIO();
  io.to(String(userId)).emit("received_messages", message);
};

export const getOnlineUsersConnected = () => {
  return userSockets.size;
};
