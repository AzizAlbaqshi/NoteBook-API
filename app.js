//Import Express from "express"
const express = require("express");
const cors = require("cors");
const noteBookRoutes = require("./API/notebook/routes");

const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //instead of bodyParser

//Routes
app.use("/notebooks", noteBookRoutes);
app.listen(8000, () => {
  console.log("the application is running on localhost:8000 ");
});
