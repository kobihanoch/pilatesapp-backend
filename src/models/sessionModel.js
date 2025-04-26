import mongoose from "mongoose";

// Pilates session model
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    type: { type: String, required: true }, // e.g., "reformer", "mat", etc.
    notes: { type: String },
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },
    location: {
      type: String,
      enum: ["studio", "home", "online"],
      default: "studio",
    },
  },
  { timestamps: true }
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
