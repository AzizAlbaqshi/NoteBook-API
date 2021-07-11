//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Notebook", {
    title: { type: DataTypes.STRING },
    Description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    Date: { type: DataTypes.INTEGER },
  });
};
