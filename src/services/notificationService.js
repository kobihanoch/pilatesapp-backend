import { enqueueEmails } from "../producers/emailProducer.js";
import { generateUpdatedSessionEmail } from "../utils/emailTamplates/sessionUpdated.js";
import { notifyUser } from "../utils/notificationsUtils.js";
import { generateSessionChangesMessage } from "../utils/notificationTemplates/sessionChanged.js";

export const notifyParticipantsWhenSessionUpdates = async (
  oldSession,
  updatedSession
) => {
  // Check if only max participants changed
  const onlyMaxParticipantsChanged =
    updatedSession.type === oldSession.type &&
    updatedSession.date.getTime() === new Date(oldSession.date).getTime() &&
    updatedSession.time === oldSession.time &&
    updatedSession.location === oldSession.location &&
    updatedSession.duration === oldSession.duration &&
    updatedSession.notes === oldSession.notes;

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
        html: generateUpdatedSessionEmail({
          fullName: user.fullName,
          session: oldSession,
          updatedSession: updatedSession,
        }),
      });

      // Live notification socket and DB
      promisesArray.push(
        notifyUser(user._id, {
          subject: "ביטול אימון",
          body: generateSessionChangesMessage(oldSession, updatedSession, user),
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
          body: generateSessionChangesMessage(oldSession, updatedSession, user),
        })
      );
    });
  }

  // Add to queue- sending emails
  if (emailsArray.length > 0) await enqueueEmails(emailsArray);

  // Promises - adding to DB and sending via socket
  await Promise.all(promisesArray);
};
