//Import Express from "express"
const express = require("express");
const cors = require("cors");
const noteRoutes = require("./API/note/routes");
const notebookRoutes = require("./API/notebook/routes");

//database
const db = require("./db/models/index");
const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //instead of bodyParser

//Routes
app.use("/notebooks", notebookRoutes);
app.use("/notes", noteRoutes);

app.use("/media", express.static("media")); // static method will save medias as a files

// ERROR Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

//path Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true }); //{force : true} use once each time to add new attributes
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
