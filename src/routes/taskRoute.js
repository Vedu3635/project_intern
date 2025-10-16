const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validate");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/taskValidation");
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/create", verifyToken, validateBody(createTaskSchema), createTask);
router.get("/getAll", verifyToken, getAllTask);
router.get("/get/:userid/:taskid", verifyToken, getTask);
router.get(
  "/update/:userid/:taskid",
  verifyToken,
  validateBody(updateTaskSchema),
  updateTask
);
router.delete("/delete/:userid/:taskid", verifyToken, deleteTask);

module.exports = router;
