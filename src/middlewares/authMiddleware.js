const jwt = require("jsonwebtoken");
dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/index.js");

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  // console.log("Print");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decode = jwt.verify(token, SECRET_KEY);
    // console.log(decode.id);
    const user = await User.findByPk(decode.id);
    // console.log("object");
    // console.log(user);
    if (!user) res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
