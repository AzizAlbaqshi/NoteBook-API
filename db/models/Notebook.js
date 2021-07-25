//const { DataTypes } = require("sequelize/types");
const { SequelizeSlugify } = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define("Notebook", {
    title: { type: DataTypes.STRING, allowNull: false },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    // description: { type: DataTypes.STRING },

    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Notebook, { source: ["title"] });
  return Notebook;
};
