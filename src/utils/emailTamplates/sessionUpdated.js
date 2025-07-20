import { generateSessionChangesMessage } from "../notificationTemplates/sessionChanged.js";

export const generateUpdatedSessionEmail = ({
  fullName,
  session,
  updatedSession,
}) => {
  const messageText = generateSessionChangesMessage(session, updatedSession, {
    fullName,
  });

  return `
    <div style="direction: rtl; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="font-size: 16px; color: #333; line-height: 1.6; white-space: pre-line;">
          ${messageText}
        </p>

        <div style="margin-top: 30px; padding: 20px; background-color: #f1f1f1; border-radius: 6px; text-align: center;">
          <p style="font-size: 14px; color: #555; margin: 0;">
            בכל שאלה או צורך נוסף, אנחנו זמינים כאן בשבילך.
          </p>
          <p style="font-size: 14px; color: #555; margin: 0;">
            רותם פילאטיס 💪
          </p>
        </div>

        <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 40px;">
          הודעה זו נשלחה אליך אוטומטית. אין צורך להשיב עליה.
        </p>
      </div>
    </div>
  `;
};
