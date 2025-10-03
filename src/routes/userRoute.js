const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/getall", getUser);
router.post("/signup", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.patch("/update/:id", updateUser);

module.exports = router;
