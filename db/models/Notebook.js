//const { DataTypes } = require("sequelize/types");
const { SequelizeSlugify } = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define("Notebook", {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    Description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    Date: { type: DataTypes.INTEGER },
  });
  SequelizeSlugify.slugifyModel(Notebook, { source: ["title"] });
  return Notebook;
};
