//Import Express from "express"
const express = require("express");
let notebooks = require("./notebooks"); //Data
const cors = require("cors");
const slugify = require("slugify");
//const bodyParser = require("body-parser");

const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //instead of bodyParser

//Routes

//Fetch (List) Route
app.get("/notebooks", (req, res) => {
  res.json(notebooks);
});

//Delete Route
app.delete("/notebooks/:notebookId", (req, res) => {
  const { notebookId } = req.params;
  const foundNotebook = notebooks.find(
    (notebook) => notebook.id === +notebookId
  );
  if (foundNotebook) {
    notebooks = notebooks.filter((notebook) => notebook.id !== +notebookId);
    res.status(204).end(); // ==> no content
  } else {
    res.status(404).json({ message: " notebook not found !" });
  }
});

//Update Route
app.put("/notebooks/:notebookId", (req, res) => {
  const { notebookId } = req.params;
  const foundNotebook = notebooks.find(
    (notebook) => notebook.id === +notebookId
  );
  if (foundNotebook) {
    for (const key in req.body) foundNotebook[key] = req.body[key];
    foundNotebook.slug = slugify(foundNotebook.title, { lower: true });
    res.status(204).end(); // ==> no content
  } else {
    res.status(404).json({ message: " notebook not found !" });
  }
});

// Create Route
app.post("/notebooks", (req, res) => {
  const id = notebooks.length + 1; //generate new Id
  const slug = slugify(req.body.title, { lower: true }); //generate new slug

  //Put everything in new notebook object (newNotebook)
  const newNotebook = {
    id,
    slug,
    ...req.body,
  };
  console.log(newNotebook);
  notebooks.push(newNotebook);
  res.status(201).json(newNotebook);
});

app.listen(8000, () => {
  console.log("the application is running on localhost:8000 ");
});
