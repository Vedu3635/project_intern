// config/sync.js - Database synchronization
const { sequelize } = require("./db");

// Import all your models here
// const User = require('../models/User');
// const Task = require('../models/Task');

const syncDatabase = async () => {
  try {
    // Development: alter tables to match models
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("✅ Database synced (alter mode)");
    }

    // Production: only check connection, don't modify tables
    else if (process.env.NODE_ENV === "production") {
      await sequelize.authenticate();
      console.log("✅ Database connection verified");
      console.log("⚠️  Run migrations for schema changes in production");
    }

    // Default: sync without altering
    else {
      await sequelize.sync();
      console.log("✅ Database synced");
    }
  } catch (error) {
    console.error("❌ Database sync failed:", error.message);
    throw error;
  }
};

module.exports = { syncDatabase };
