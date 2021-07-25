const sequelizeSlugify = require("sequelize-Slugify");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    Subtitle: { type: DataTypes.STRING },
    // price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: { min: 1 },
    //   defaultValue: 4,
    // },

    description: { type: DataTypes.STRING },

    image: { type: DataTypes.STRING },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  sequelizeSlugify.slugifyModel(Note, { source: ["title"] });
  return Note;
};
