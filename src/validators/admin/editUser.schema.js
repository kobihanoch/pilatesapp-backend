import { z } from "zod";

export const editUserSchema = z
  .object({
    username: z.string().trim().min(1, "Username is required").optional(),

    fullName: z.string().trim().min(1, "Full name is required").optional(),

    email: z
      .string()
      .trim()
      .toLowerCase()

      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Invalid email format",
      })
      .optional(),

    birthDate: z
      .preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date()
      )
      .optional(),

    gender: z
      .enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Invalid gender value" }),
      })
      .optional(),

    role: z
      .enum(["user", "admin"], {
        errorMap: () => ({ message: "Invalid role value" }),
      })
      .optional(),

    // Prevent `password` from ever being passed in
    password: z
      .undefined({
        message: "Password updates not allowed through this endpoint",
      })
      .optional(),
  })
  .strict(); // Rejects unknown keys if you want to be strict
