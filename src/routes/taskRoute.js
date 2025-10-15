const express = require("express");
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

router.post("/create", validateBody(createTaskSchema), createTask);
router.get("/getAll/:id", getAllTask);
router.get("/get/:userid/:taskid", getTask);
router.get(
  "/update/:userid/:taskid",
  validateBody(updateTaskSchema),
  updateTask
);
router.delete("/delete/:userid/:taskid", deleteTask);

module.exports = router;
