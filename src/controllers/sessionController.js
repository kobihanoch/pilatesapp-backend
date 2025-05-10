import Session from "../models/sessionModel.js";

// @desc    Create a new session
// @route   POST /sessions/create
// @access  Private/Admin
export const createSession = async (req, res) => {
  try {
    const {
      date,
      time,
      duration,
      type,
      notes,
      status,
      location,
      participants,
      maxParticipants,
    } = req.body;

    const newSession = await Session.create({
      date,
      time,
      duration,
      type,
      notes,
      status,
      location,
      participants,
      maxParticipants,
    });

    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create session" });
  }
};

// @desc    Get all sessions the user is registered to
// @route   GET /sessions/my
// @access  Private
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      participants: req.user._id,
    }).populate("participants", "username email fullName");

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your sessions" });
  }
};

// @desc    Get all sessions
// @route   GET /sessions/all
// @access  Private/Admin
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate(
      "participants",
      "username email"
    );

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

// @desc    Get a session by ID
// @route   GET /sessions/:id
// @access  Private
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate(
      "participants",
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
      "maxParticipants",
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

// @desc    Register a user to a session
// @route   POST /sessions/register/:id
// @access  Private
export const registerToSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.participants.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "Already registered to this session" });
    }

    if (session.participants.length >= session.maxParticipants) {
      return res.status(400).json({ message: "Session is full" });
    }

    session.participants.push(req.user._id);
    await session.save();

    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register to session" });
  }
};

// @desc    Unregister a user from a session
// @route   POST /sessions/unregister/:id
// @access  Private
export const unregisterFromSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.participants = session.participants.filter(
      (participantId) => participantId.toString() !== req.user._id.toString()
    );

    await session.save();

    res.status(200).json({ message: "Unregistered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to unregister from session" });
  }
};

// @desc    Gets all sessions until next month
// @route   GET /sessions/soon
// @access  Private
export const getAllSessionsForThisYearFromSelectedDate = async (req, res) => {
  try {
    const selectedDate = new Date(req.query.date);
    //console.log(selectedDate);
    const selectedYear = selectedDate.getFullYear();

    const startOfYear = new Date(`${selectedYear}-01-01T00:00:00Z`);
    const endOfYear = new Date(`${selectedYear + 1}-01-01T00:00:00Z`);

    const sessions = await Session.find({
      date: {
        $gte: startOfYear,
        $lt: endOfYear,
      },
    }).populate("participants", "username email");

    res.json(sessions);
  } catch (error) {
    console.error("Failed to fetch yearly sessions:", error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};
