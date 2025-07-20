export const generateSessionChangesMessage = (
  oldSession,
  updatedSession,
  user
) => {
  const changes = [];

  // If the session was canceled - write which session and stop
  if (updatedSession.status === "בוטל") {
    const originalDate = oldSession.date.toLocaleDateString("he-IL");
    const originalTime = oldSession.time;
    const sessionType = oldSession.type;

    return `שלום ${user.fullName},\n\nהאימון מסוג ${sessionType} שהיה מתוכנן לתאריך ${originalDate} בשעה ${originalTime} בוטל.`;
  }

  // Date change - postponed or moved earlier
  if (oldSession.date.getTime() !== updatedSession.date.getTime()) {
    const newDate = updatedSession.date.toLocaleDateString("he-IL");
    const diff = updatedSession.date.getTime() - oldSession.date.getTime();
    const daysDiff = diff / (1000 * 60 * 60 * 24);

    if (daysDiff > 0) {
      changes.push(`האימון נדחה לתאריך ${newDate}.`);
    } else {
      changes.push(`האימון הוקדם לתאריך ${newDate}.`);
    }
  }

  // Time change - postponed or moved earlier
  if (oldSession.time !== updatedSession.time) {
    const oldHour = parseInt(oldSession.time.split(":")[0], 10);
    const newHour = parseInt(updatedSession.time.split(":")[0], 10);

    if (newHour > oldHour) {
      changes.push(`האימון נדחה לשעה ${updatedSession.time}.`);
    } else {
      changes.push(`האימון הוקדם לשעה ${updatedSession.time}.`);
    }
  }

  // Duration change - extended or shortened
  if (oldSession.duration !== updatedSession.duration) {
    if (updatedSession.duration > oldSession.duration) {
      changes.push(`משך האימון הוארך ל-${updatedSession.duration} דקות.`);
    } else {
      changes.push(`משך האימון קוצר ל-${updatedSession.duration} דקות.`);
    }
  }

  // Type of session change
  if (oldSession.type !== updatedSession.type) {
    changes.push(`סוג האימון שונה ל-${updatedSession.type}.`);
  }

  // Location change
  if (oldSession.location !== updatedSession.location) {
    changes.push(`המיקום שונה ל-${updatedSession.location}.`);
  }

  // New or changed note
  if ((oldSession.notes || "") !== (updatedSession.notes || "")) {
    if (updatedSession.notes) {
      changes.push(`נוספה הערה חדשה לאימון: "${updatedSession.notes}".`);
    } else {
      changes.push(`ההערה שנרשמה לאימון הוסרה.`);
    }
  }

  // Original session details
  const originalDate = oldSession.date.toLocaleDateString("he-IL");
  const originalTime = oldSession.time;
  const sessionType = oldSession.type;

  // Build the final message
  let message = `שלום ${user.fullName},\n\nעודכנו שינויים באימון ${sessionType} שאתה רשום אליו, שהיה מתוכנן לתאריך ${originalDate} בשעה ${originalTime}:\n\n`;

  // No changes found
  if (changes.length === 0) {
    return message + "אין שינויים מהותיים לאימון שלך.";
  }

  // Add the list of changes and a final note
  message += `${changes.join("\n")}\n\nשאר פרטי האימון נשארו ללא שינוי.`;

  return message;
};
