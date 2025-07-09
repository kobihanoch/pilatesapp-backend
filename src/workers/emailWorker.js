import { sendMail } from "../config/mailer.js";
import emailQueue from "../queues/emailQueue.js";

const startEmailWorker = async () => {
  console.log("📬 Email-Worker started – waiting for jobs…");
  emailQueue.process(5, async (job) => {
    const { to, subject, html } = job.data;
    try {
      // Preventing overflowing of emails
      if (expiresAt && Date.now() > expiresAt) {
        console.log(`⏱️ Skipping expired email to ${to}`);
        return;
      }

      await sendMail({ to, subject, html });
      console.log("Email worker: email sent to", to);
    } catch (e) {
      console.log(`❌ Failed to send email to ${to}: ${e.message}`);
      throw e;
    }
  });
  process.on("SIGINT", async () => {
    console.log("👋 Gracefully shutting down email worker...");
    await emailQueue.close();
    process.exit(0);
  });
};

startEmailWorker();
