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

export const getOnlineUsersConnected = () => {
  return userSockets.size;
};
