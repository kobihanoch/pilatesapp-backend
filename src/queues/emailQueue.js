import { Queue } from "bullmq";
import { redis } from "../config/redisClient.js";

export const emailQueue = new Queue("emailQueue", {
  connection: redis,
});
