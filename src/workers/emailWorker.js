import { redis, connectRedis } from "../config/redisClient.js";
import { sendMail } from "../utils/mailer.js";
import createError from "http-errors";

const startEmailWorker = async () => {
  console.log("📬 Email-Worker started – waiting for jobs…");
  await connectRedis();

  while (true) {
    try {
      const res = await redis.brPop("emailQueue", 0);

      if (!res) continue;

      const emailData = JSON.parse(res.element); // { to, subject, html }
      console.log("▶︎ Sending email to:", emailData.to);

      try {
        await sendMail(emailData);
        console.log("✅ Sent:", emailData.to);
      } catch (err) {
        console.log("❌ Failed:", emailData.to, err.message);
      }
    } catch (err) {
      console.log("⚠️ Worker error — retrying in 5 s:", err.message);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
};

startEmailWorker();
