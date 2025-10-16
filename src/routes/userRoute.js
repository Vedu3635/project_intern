const express = require("express");
const validateBody = require("../middlewares/validate");
const verifyToken = require("../middlewares/authMiddleware");
const {
  registerSchema,
  updateUserSchema,
} = require("../validations/userValidation");
const {
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Public Routes
router.post("/register", validateBody(registerSchema), register);
// router.post("/login", validateBody(loginSchema), login);
router.post("/login", login);

// Protected Routes
router.get("/users", verifyToken, getUser);
router.delete("/delete", verifyToken, deleteUser);
router.put("/update", verifyToken, validateBody(updateUserSchema), updateUser);
router.patch(
  "/update",
  verifyToken,
  validateBody(updateUserSchema),
  updateUser
);

module.exports = router;
