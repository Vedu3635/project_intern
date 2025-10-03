const { sequelize, DataTypes, testConnection } = require("./db");
dotenv = require("dotenv");
dotenv.config();
const UserModel = require("../models/User.js");
const TaskModel = require("../models/Task.js");

// Init models
const models = {};
models.User = UserModel(sequelize, DataTypes);
models.Task = TaskModel(sequelize, DataTypes);

// Run associations
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

const syncDatabase = async () => {
  try {
    const connected = await testConnection();
    if (!connected) return;
    // Development: alter tables to match models
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ force: true });
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
