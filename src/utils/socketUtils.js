import { getIO } from "../config/webSocket.js";

export const sendServerMessageToUser = async (userId, message) => {
  const io = getIO();
  io.to(String(userId)).emit("received_messages", message);
};

export const getOnlineUsersConnected = () => {
  return userSockets.size;
};
