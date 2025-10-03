const express = require("express");
const validateBody = require("../middlewares/validate");
const {
  registerSchema,
  updateUserSchema,
} = require("../validations/userValidation");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/getall", getUser);
router.post("/signup", validateBody(registerSchema), createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", validateBody(updateUserSchema), updateUser);
router.patch("/update/:id", validateBody(updateUserSchema), updateUser);

module.exports = router;
