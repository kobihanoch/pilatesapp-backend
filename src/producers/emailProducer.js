// producers/emailProducer.js
import emailQueue from "../queues/emailQueue.js";

// Add jobs to queue
export const enqueueEmails = async (emails) => {
  await emailQueue.addBulk(
    emails.map((e) => ({ data: e, opts: { attempts: 3, backoff: 5000 } }))
  );
};
