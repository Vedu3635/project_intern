const express = require("express");
const cors = require("cors");
dotenv = require("dotenv");
dotenv.config();
const { syncDatabase } = require("./config/sync");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
};

startServer();
