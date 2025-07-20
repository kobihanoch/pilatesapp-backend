import Notification from "../models/notificationModel.js";
import { sendServerMessageToUser } from "./socketUtils.js";

// This util is only for server messages
export const notifyUser = async (targetUserId, msg) => {
  // Store in DB
  await Notification.create({
    to: targetUserId,
    subject: msg.subject,
    body: msg.body,
  });

  // Send via socket
  sendServerMessageToUser(targetUserId, msg);
};
