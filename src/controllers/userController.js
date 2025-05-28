// src/controllers/userController.js

import bcrypt from "bcryptjs";
import createError from "http-errors";
import User from "../models/userModel.js";

// @desc    Create a new user
// @route   POST /api/users/create
// @access  Public
export const createUser = async (req, res) => {
  const { username, fullName, email, password, birthDate, gender } = req.body;
  if (!username || !fullName || !email || !password || !birthDate || !gender) {
    throw createError(400, "All fields are required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw createError(400, "Invalid email format");
  if (await User.findOne({ email }))
    throw createError(400, "User already exists");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    fullName,
    email,
    password: hash,
    birthDate,
    gender,
    role: "user",
  });
  res.status(201).json({ message: "User created successfully!", user });
};

// @desc    Get all users
// @route   GET /api/users/all
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// @desc    Get authenticated user by ID
// @route   GET /api/users/get
// @access  Private
export const getAuthenticatedUserById = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password +role");
  if (!user) throw createError(404, "User not found");
  res.json(user);
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password +role");
  if (!user) throw createError(404, "User not found");
  res.json(user);
};

// @desc    Update a user by ID
// @route   PUT /api/users/update/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw createError(404, "User not found");
  Object.assign(user, req.body);
  const updated = await user.save();
  res.json(updated);
};

// @desc    Update authenticated user
// @route   PUT /api/users/update
// @access  Private
export const updateAuthenticatedUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw createError(404, "User not found");
  Object.assign(user, req.body);
  const updated = await user.save();
  res.json(updated);
};

// @desc    Delete a user by ID
// @route   DELETE /api/users/delete/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw createError(404, "User not found");
  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};
