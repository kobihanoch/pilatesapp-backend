import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, birthDate, gender, role } = req.body;

    if (!password || !role) {
      return res
        .status(400)
        .json({ message: "Password and role are required" });
    }

    // Checks if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the user with hashed password
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      birthDate,
      gender,
      role,
    });

    res.status(201).json({
      message: "User created susccessfully!",
      _id: user._id,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password +role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { username, email, birthDate, gender, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.birthDate = birthDate || user.birthDate;
    user.gender = gender || user.gender;
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
