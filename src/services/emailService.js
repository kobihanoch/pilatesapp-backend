import { generateCancelledEmail } from "../utils/emailTamplates/sessionCancelled.js";
import { generateUpdatedSessionEmail } from "../utils/emailTamplates/sessionUpdated.js";
import { enqueueEmails } from "../producers/emailProducer.js";

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
    });
  }

  // Add to queue
  if (emailsArray.length > 0) await enqueueEmails(emailsArray);
};
