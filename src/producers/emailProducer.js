// producers/emailProducer.js
import { redis } from "../config/redisClient.js";

// Add jobs to queue
export const enqueueEmails = async (emails) => {
  for (const email of emails) {
    await redis.lPush("emailQueue", JSON.stringify(email));
  }
};
