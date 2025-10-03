// models/index.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");
const User = require("./User.js");
const Task = require("./Task.js");

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
// 3. Attach sequelize instance and class
db.sequelize = sequelize;
db.Sequelize = DataTypes;

module.exports = db;
