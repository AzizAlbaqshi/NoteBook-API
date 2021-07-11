const express = require("express");
const {
  notebookFetch,
  notebookDelete,
  notebookUpdate,
  notebookCreate,
} = require("./controllers");
const router = express.Router(); // method from Express "Router"

//Fetch (List) Route
router.get("/", notebookFetch);

//Delete Route
router.delete("/:notebookId", notebookDelete);

//Update Route
router.put("/:notebookId", notebookUpdate);

// Create Route
router.post("/", notebookCreate);

module.exports = router;
