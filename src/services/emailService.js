import { generateCancelledEmail } from "../utils/emailTamplates/sessionCancelled.js";
import { generateUpdatedSessionEmail } from "../utils/emailTamplates/sessionUpdated.js";
import { sendMail } from "../utils/mailer.js";

export const notifyParticipantsWhenSessionUpdates = async (
  oldSession,
  updatedSession
) => {
  // Check if only max participants changed
  const onlyMaxParticipantsChanged =
    updatedSession.type === oldSession.type &&
    updatedSession.date.getTime() === new Date(oldSession.date).getTime() &&
    updatedSession.time === oldSession.time &&
    updatedSession.location === oldSession.location;

  // Send emails with updates
  if (updatedSession.status === "בוטל") {
    // Send an email for canclelation
    await Promise.all(
      updatedSession.participants.map((user) => {
        const userMail = user.email;
        const html = generateCancelledEmail({
          fullName: user.fullName,
          session: oldSession,
        });
        console.log("Sending email to ", userMail);
        return sendMail({
          to: userMail,
          subject: "ביטול אימון",
          html,
        });
      })
    );
  } else if (!onlyMaxParticipantsChanged) {
    // Send an email for update
    await Promise.all(
      updatedSession.participants.map((user) => {
        const userMail = user.email;
        const html = generateUpdatedSessionEmail({
          fullName: user.fullName,
          session: oldSession,
          updatedSession: updatedSession,
        });
        console.log("Sending email to ", userMail);
        return sendMail({
          to: userMail,
          subject: "שינוי באימון",
          html,
        });
      })
    );
  }
};
