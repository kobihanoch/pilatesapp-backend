import mongoose from "mongoose";

// Pilates group session model
const sessionSchema = new mongoose.Schema(
  {
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
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    maxParticipants: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
