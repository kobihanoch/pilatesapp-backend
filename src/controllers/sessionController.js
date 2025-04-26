import Session from "../models/sessionModel.js";

// @desc    Create a new session
// @route   POST /sessions/create
// @access  Private (Logged-in users)
export const createSession = async (req, res) => {
  try {
    const { date, duration, type, notes, status, location } = req.body;

    const newSession = await Session.create({
      userId: req.user._id,
      date,
      duration,
      type,
      notes,
      status,
      location,
    });

    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create session" });
  }
};

// @desc    Get all sessions (Admin only)
// @route   GET /sessions/all
// @access  Private/Admin
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("userId", "username email");

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

// @desc    Get all sessions of a specific user
// @route   GET /sessions/all/:userId
// @access  Private
export const getAllSessionsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const sessions = await Session.find({ userId });

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user's sessions" });
  }
};

// @desc    Get a single session by ID
// @route   GET /sessions/:id
// @access  Private
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate(
      "userId",
      "username email"
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};

// @desc    Update a session by ID
// @route   PUT /sessions/update/:id
// @access  Private/Admin
export const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const fieldsToUpdate = [
      "date",
      "duration",
      "type",
      "notes",
      "status",
      "location",
    ];
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        session[field] = req.body[field];
      }
    });

    const updatedSession = await session.save();

    res.json(updatedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update session" });
  }
};

// @desc    Delete a session by ID
// @route   DELETE /sessions/delete/:id
// @access  Private/Admin
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await session.deleteOne();

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete session" });
  }
};
