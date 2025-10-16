const bcrypt = require("bcrypt");
const db = require("../models/index");
const { User } = require("../models/index.js");
const { generateToken } = require("../utils/jwt.js");

// get user
const getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all user, server error" });
  }
};

// register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the user, server error" });
  }
};

// login user

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "User not found on this email." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.json(400).json({ message: "Invalid password." });

    const token = generateToken({
      id: user.id,
      username: user.name,
      email: user.email,
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ error: "User not found, server error" });
    // Only update fields if they exist in request
    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const { password: _, ...userData } = user.toJSON();
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user, server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user, server error" });
  }
};

module.exports = {
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
};
