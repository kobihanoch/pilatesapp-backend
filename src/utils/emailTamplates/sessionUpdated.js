// utils/emailTemplates/sessionCancelled.js
export const generateUpdatedSessionEmail = ({
  fullName,
  session,
  updatedSession,
}) => {
  console.log(session);
  return `
    <div style="direction: rtl; font-family: Arial; padding: 20px;">
      <h2>שלום ${fullName},</h2>
      <p>בוצע שינוי באימון שאת/ה רשום/ה אליו</p>
      <ul>
        <li><strong>סוג אימון:</strong> ${session.type}</li>
        <li><strong>תאריך:</strong> ${new Date(session.date).toLocaleDateString("he-IL")}</li>
        <li><strong>שעה:</strong> ${session.time}</li>
        <li><strong>מיקום:</strong> ${session.location}</li>
      </ul>

      <p>פרטי האימון המועדכנים הם:</p>
      <ul>
        <li><strong>סוג אימון:</strong> ${updatedSession.type}</li>
        <li><strong>תאריך:</strong> ${new Date(updatedSession.date).toLocaleDateString("he-IL")}</li>
        <li><strong>שעה:</strong> ${updatedSession.time}</li>
        <li><strong>מיקום:</strong> ${updatedSession.location}</li>
      </ul>
    </div>
  `;
};
