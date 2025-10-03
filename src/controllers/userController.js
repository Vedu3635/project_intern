const bcrypt = require("bcrypt");
const db = require("../models/index");
const { User } = db;

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

// create user
const createUser = async (req, res) => {
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
  createUser,
  updateUser,
  deleteUser,
};
