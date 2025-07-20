import { enqueueEmails } from "../producers/emailProducer.js";
import { generateCancelledEmail } from "../utils/emailTamplates/sessionCancelled.js";
import { generateUpdatedSessionEmail } from "../utils/emailTamplates/sessionUpdated.js";
import { notifyUser } from "../utils/notificationsUtils.js";

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

  const emailsArray = [];
  const promisesArray = [];
  let msg = "";

  // Send emails with updates
  if (updatedSession.status === "בוטל") {
    // Send an email for canclelation
    updatedSession.participants.forEach((user) => {
      emailsArray.push({
        to: user.email,
        subject: "ביטול אימון",
        html: generateCancelledEmail({
          fullName: user.fullName,
          session: oldSession,
        }),
      });

      // Live notification socket and DB
      promisesArray.push(
        notifyUser(user._id, {
          subject: "שינוי באימון",
          body: `שלום ${user.fullName}!\n האימון שאתה רשום אליו בוטל`,
        })
      );
    });
  } else if (!onlyMaxParticipantsChanged) {
    // Send an email for update
    updatedSession.participants.forEach((user) => {
      emailsArray.push({
        to: user.email,
        subject: "עדכון אימון",
        html: generateUpdatedSessionEmail({
          fullName: user.fullName,
          session: oldSession,
          updatedSession: updatedSession,
        }),
      });

      // Live notification socket and DB
      promisesArray.push(
        notifyUser(user._id, {
          subject: "שינוי באימון",
          body: `שלום ${user.fullName}!\n בוצע שינוי באימון שאתה רשום אליו.`,
        })
      );
    });
  }

  // Add to queue- sending emails
  if (emailsArray.length > 0) await enqueueEmails(emailsArray);

  // Promises - adding to DB and sending via socket
  await Promise.all(promisesArray);
};
