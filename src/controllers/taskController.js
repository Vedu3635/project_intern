const { where } = require("sequelize");
const db = require("../models/index");
const { Task, User } = db;

const createTask = async (req, res) => {
  try {
    const { userId, title, description, status, due_date } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const task = await Task.create({
      userId,
      title,
      description,
      status,
      due_date,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getTask = async (req, res) => {
  const { userid, taskid } = req.params;

  try {
    const task = await Task.findOne({
      where: {
        id: taskid,
        userId: userid,
      },
    });
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get task, server error" });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
    });
    if (tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get all task, server error" });
  }
};

const updateTask = async (req, res) => {
  const { userid, taskid } = req.params;
  try {
    const { title, description, status, due_date } = req.body;
    const task = await Task.findOne({
      where: {
        id: taskid,
        userId: userid,
      },
    });
    if (!task)
      return res
        .status(404)
        .json({ error: "Task not found, please select correct task" });
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (due_date) task.due_date = due_date;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update task, server error",
    });
  }
};

const deleteTask = async (req, res) => {
  const { userid, taskid } = req.params;
  try {
    const task = await Task.findOne({
      where: {
        id: taskid,
        userId: userid,
      },
    });
    if (!task) return res.status(404).json({ error: "Task not found." });
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delte user, server error" });
  }
};

module.exports = { createTask, getTask, getAllTask, updateTask, deleteTask };
