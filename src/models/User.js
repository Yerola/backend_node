const { DataTypes } = require("sequelize");
const colors = require("colors");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      timestamps: false,
    }
  );
};

console.log("se generó el modelo user".cyan);