// models/index.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Your database connection

// 1. Import all of your model files
import User from "./User.js";
import Task from "./Task.js"; // Make sure you have a Task model for the association

const db = {};

// 2. Initialize each model by calling the exported function
db.User = User(sequelize, DataTypes);
db.Task = Task(sequelize, DataTypes);

// 3. Run model associations (this part remains the same)
// It finds the `.associate` method on each model and runs it
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 4. Attach the sequelize instances to the db object
db.sequelize = sequelize;
db.Sequelize = DataTypes.sequelize;

export default db;
