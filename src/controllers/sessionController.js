// src/controllers/sessionController.js

import createError from "http-errors";
import Session from "../models/sessionModel.js";

// @desc    Create a new session
// @route   POST /api/sessions/create
// @access  Private/Admin
export const createSession = async (req, res) => {
  const session = await Session.create(req.body);
  res.status(201).json(session);
};

// @desc    Get all sessions the user is registered to
// @route   GET /api/sessions/my
// @access  Private
export const getMySessions = async (req, res) => {
  const sessions = await Session.find({ participants: req.user._id }).populate(
    "participants",
    "username email fullName"
  );
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
      { type: { $regex: search, $options: "i" } },
      { notes: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ],
  };

  const [sessions, total] = await Promise.all([
    Session.find(filter)
      .populate("participants", "username email")
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
  Object.assign(session, req.body);
  const updated = await session.save();
  res.json(updated);
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

// @desc    Register a user to a session
// @route   POST /api/sessions/register/:id
// @access  Private
export const registerToSession = async (req, res) => {
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
