const jwt = require("jsonwebtoken");
dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  console.log("Hello");
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken };
