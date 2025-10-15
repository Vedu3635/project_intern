module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: "userId",
      as: "tasks",
    });
  };

  return User;
};
