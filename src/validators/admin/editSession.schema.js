import { z } from "zod";

export const editSessionSchema = z
  .object({
    date: z.string().min(1, "All fields are required"),

    time: z.string().min(1, "All fields are required"),

    type: z.string().min(1, "All fields are required"),

    duration: z.preprocess(
      (val) => Number(val),
      z
        .number({
          required_error: "All fields are required",
          invalid_type_error: "Duration must be a number",
        })
        .gt(0, "Duration must be greater than 0")
    ),

    maxParticipants: z.preprocess(
      (val) => Number(val),
      z
        .number({
          required_error: "All fields are required",
          invalid_type_error: "Max participants must be a number",
        })
        .gt(0, "Max participants must be greater than 0")
    ),

    location: z.string().min(1, "All fields are required"),

    status: z
      .enum(["מתוכנן", "בוטל", "הושלם"], {
        errorMap: () => ({ message: "Invalid status" }),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // בדיקה שהתאריך לא בעבר לפי Asia/Jerusalem
      const selectedDateStr = new Date(data.date).toLocaleDateString("en-CA", {
        timeZone: "Asia/Jerusalem",
      });
      const todayJerusalemStr = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Jerusalem",
      });

      return selectedDateStr >= todayJerusalemStr;
    },
    {
      message: "Cannot create a session in the past",
      path: ["date"],
    }
  );
