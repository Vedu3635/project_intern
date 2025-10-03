module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Description can be optional
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        allowNull: false,
        defaultValue: "pending",
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true, // Due date can be optional
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // This should match the table name for the User model
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "tasks", // Explicitly define the table name
      timestamps: true, // Automatically adds createdAt and updatedAt columns
    }
  );

  Task.associate = (models) => {
    // A Task belongs to a single User
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user", // This alias is optional but helpful for queries
    });
  };

  return Task;
};
