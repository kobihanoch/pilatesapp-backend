// utils/emailTemplates/sessionCancelled.js
export const generateCancelledEmail = ({ fullName, session }) => {
  return `
    <div style="direction: rtl; font-family: Arial; padding: 20px;">
      <h2>שלום ${fullName},</h2>
      <p>ברצוננו לעדכן כי האימון שלך בוטל:</p>
      <ul>
        <li><strong>סוג אימון:</strong> ${session.type}</li>
        <li><strong>תאריך:</strong> ${new Date(session.date).toLocaleDateString("he-IL")}</li>
        <li><strong>שעה:</strong> ${session.time}</li>
        <li><strong>מיקום:</strong> ${session.location}</li>
      </ul>
      <p>נשמח לראותך באימונים הבאים 🙏</p>
    </div>
  `;
};
