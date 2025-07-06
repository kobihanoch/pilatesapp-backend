// src/controllers/sessionController.js

import createError from "http-errors";
import Session from "../models/sessionModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import { sendMail } from "../utils/mailer.js";
import { generateCancelledEmail } from "../utils/emailTamplates/sessionCancelled.js";

// @desc    Create a new session
// @route   POST /api/sessions/create
// @access  Private/Admin
export const createSession = async (req, res) => {
  console.log("Creating session with data:", req.body);
  if (
    !req.body.date ||
    !req.body.time ||
    !req.body.type ||
    !req.body.duration ||
    !req.body.location ||
    !req.body.maxParticipants
  ) {
    throw createError(400, "All fields are required");
  }
  if (req.body.maxParticipants <= 0) {
    throw createError(400, "Max participants must be greater than 0");
  }
  if (req.body.duration <= 0) {
    throw createError(400, "Duration must be greater than 0");
  }
  if (
    req.body.status &&
    !["מתוכנן", "בוטל", "הושלם"].includes(req.body.status)
  ) {
    throw createError(400, "Invalid status");
  }

  const selectedDateStr = new Date(req.body.date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Jerusalem",
  });
  const todayJerusalemStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jerusalem",
  });

  if (selectedDateStr < todayJerusalemStr) {
    throw createError(400, "Cannot create a session in the past");
  }

  const session = await Session.create(req.body);
  res.status(201).json(session);
};

// @desc    Get all upcoming sessions for user
// @route   GET /api/sessions/myupcoming
// @access  Private
export const getMyUpcomingSessions = async (req, res) => {
  let sessions = await Session.find({ participants: req.user._id }).populate(
    "participants",
    "username email fullName"
  );

  sessions = sessions
    .filter((s) => s.status === "מתוכנן")
    .sort((a, b) => {
      const aDateTime = new Date(a.date);
      aDateTime.setHours(
        Number(a.time.split(":")[0]),
        Number(a.time.split(":")[1])
      );
      const bDateTime = new Date(b.date);
      bDateTime.setHours(
        Number(b.time.split(":")[0]),
        Number(b.time.split(":")[1])
      );
      console.log(aDateTime);
      console.log(bDateTime);
      return aDateTime - bDateTime;
    });

  res.json(sessions);
};

// @desc    Get all sessions the user is registered to
// @route   GET /api/sessions/mycompleted
// @access  Private
export const getMyCompletedSessions = async (req, res) => {
  let sessions = await Session.find({ participants: req.user._id }).populate(
    "participants",
    "username email fullName"
  );

  sessions = sessions
    .filter((s) => s.status === "הושלם")
    .sort((a, b) => {
      const aDateTime = new Date(a.date);
      aDateTime.setHours(
        Number(a.time.split(":")[0]),
        Number(a.time.split(":")[1])
      );
      const bDateTime = new Date(b.date);
      bDateTime.setHours(
        Number(b.time.split(":")[0]),
        Number(b.time.split(":")[1])
      );
      console.log(aDateTime);
      console.log(bDateTime);
      return aDateTime - bDateTime;
    });

  res.json(sessions);
};

// @desc    Get paginated sessions
// @route   GET /api/sessions/all
// @access  Private/Admin
export const getPaginatedSessions = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const search = req.query.search || "";
  const sortField = req.query.sortField || "date";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const skip = (page - 1) * limit;

  if (page < 1 || limit < 1 || limit > 100) {
    throw createError(400, "Invalid pagination parameters");
  }

  // Free text search
  const filter = {
    $or: [
      { time: { $regex: search, $options: "i" } },
      { status: { $regex: search, $options: "i" } },
      { type: { $regex: search, $options: "i" } },
      { notes: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ],
  };

  const [sessions, total] = await Promise.all([
    Session.find(filter)
      .populate("participants", "id username email fullName")
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Session.countDocuments(filter),
  ]);

  res.status(200).json({
    sessions,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
};

// @desc    Get a session by ID
// @route   GET /api/sessions/:id
// @access  Private
export const getSessionById = async (req, res) => {
  const session = await Session.findById(req.params.id).populate(
    "participants",
    "username email"
  );
  if (!session) throw createError(404, "Session not found");
  res.json(session);
};

// @desc    Update a session by ID
// @route   PUT /api/sessions/update/:id
// @access  Private/Admin
export const updateSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) throw createError(404, "Session not found");
  if (session.status === "בוטל" || session.status === "הושלם") {
    throw createError(400, "Cannot update a cancelled or completed session");
  }
  if (req.body.duration !== undefined) {
    req.body.duration = Number(req.body.duration);
  }
  if (req.body.maxParticipants !== undefined) {
    req.body.maxParticipants = Number(req.body.maxParticipants);
  }

  Object.assign(session, req.body);
  await session.save();
  const updated = await Session.findById(req.params.id)
    .populate("participants", "fullName username email")
    .exec();

  // Send an email for canclelation
  for (const user of updated.participants) {
    const userMail = user.email;
    const html = generateCancelledEmail({ fullName: user.fullName, session });
    console.log("Sending email to ", userMail);
    await sendMail({
      to: userMail,
      subject: "ביטול אימון",
      html,
    });
  }

  res.status(200).json({
    message: "Session updated successfully",
    session: updated,
  });
};

// @desc    Delete a session by ID
// @route   DELETE /api/sessions/delete/:id
// @access  Private/Admin
export const deleteSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) throw createError(404, "Session not found");
  await session.deleteOne();
  res.json({ message: "Session deleted successfully" });
};

// @desc    Cancel a session by ID
// @route   PUT /api/sessions/cancel/:id
// @access  Private/Admin
export const cancelSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) throw createError(404, "Session not found");
  if (session.status === "בוטל")
    throw createError(400, "Session already cancelled");
  session.status = "בוטל";
  await session.save();
  res
    .status(200)
    .json({ message: "Session cancelled successfully", session: session });
};

// @desc    Register a user to a session
// @route   POST /api/sessions/register/:sessionId/:userId
// @access  Private
export const registerToSession = async (req, res) => {
  console.log("Registering user to session:", req.params.id);
  const session = await Session.findById(req.params.id);
  if (!session) throw createError(404, "Session not found");
  if (["הושלם", "בוטל"].includes(session.status))
    throw createError(
      400,
      "Cannot register to a completed or cancelled session"
    );
  if (session.participants.includes(req.user._id))
    throw createError(400, "Already registered to this session");
  if (session.participants.length >= session.maxParticipants)
    throw createError(400, "Session is full");
  session.participants.push(req.user._id);
  await session.save();
  res
    .status(200)
    .json({ message: "Registered successfully", session: session });
};

// @desc    Unregister a user from a session
// @route   POST /api/sessions/unregister/:id
// @access  Private
export const unregisterFromSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) throw createError(404, "Session not found");
  session.participants = session.participants.filter(
    (id) => id.toString() !== req.user._id.toString()
  );
  await session.save();
  res.status(200).json({ message: "Unregistered successfully" });
};

// @desc    Get all sessions for the year of the selected date
// @route   GET /api/sessions/soon
// @access  Private
export const getAllSessionsForThisYearFromSelectedDate = async (req, res) => {
  const date = new Date(req.query.date);
  const year = date.getFullYear();
  const start = new Date(`${year}-01-01T00:00:00Z`);
  const end = new Date(`${year + 1}-01-01T00:00:00Z`);
  const sessions = await Session.find({
    date: { $gte: start, $lt: end },
  }).populate("participants", "username email");
  res.json(sessions);
};

// @desc    Register a user to a session
// @route   GET /api/sessions/register/:sessionId/:username
// @access  Private/Admin
export const registerUserToSession = async (req, res) => {
  const { sessionId, username } = req.params;
  const userId = (await User.findOne({ username }).select("_id"))?._id;
  if (!userId) throw createError(404, "User not found");
  const session = await Session.findById(sessionId);
  if (!session) throw createError(404, "Session not found");
  if (["הושלם", "בוטל"].includes(session.status))
    throw createError(
      400,
      "Cannot register to a completed or cancelled session"
    );
  if (session.participants.includes(userId)) {
    throw createError(400, "User already registered to this session");
  }
  if (session.participants.length >= session.maxParticipants)
    throw createError(400, "Session is full");
  session.participants.push(userId);
  await session.save();
  await session.populate("participants", "fullName username email");

  res
    .status(200)
    .json({ message: "User registered successfully", session: session });
};

// @desc    Unregister a user from a session
// @route   POST /api/sessions/unregister/:sessionId/:userId
// @access  Private/Admin
export const unregisterUserFromSession = async (req, res) => {
  const { sessionId, userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createError(400, "Invalid user ID");
  }

  const session = await Session.findById(sessionId);
  if (!session) throw createError(404, "Session not found");

  if (["הושלם", "בוטל"].includes(session.status)) {
    throw createError(
      400,
      "Cannot unregister from a completed or cancelled session"
    );
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const isRegistered = session.participants.some((id) =>
    id.equals(userObjectId)
  );
  if (!isRegistered) {
    throw createError(400, "User is not registered to this session");
  }

  session.participants.pull(userObjectId);
  await session.save();
  await session.populate("participants", "fullName username email");

  res
    .status(200)
    .json({ message: "User unregistered successfully", session: session });
};
