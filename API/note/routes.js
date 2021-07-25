const express = require("express"); //import express from express

const {
  noteFetch,
  updateNote,
  deleteNote,
  fetchNote,
} = require("./controllers");

const multer = require("multer");
//const passport = require("passport");
const router = express.Router(); // import router method from express

//Parameter
router.param("noteId", async (req, res, next, noteId) => {
  const note = await fetchNote(noteId, next);
  if (note) {
    req.note = note;
    next();
  } else {
    const error = new Error("Note Not Found");
    error.status = 404;
    next(error);
  }
});

//multer
const storage = multer.diskStorage({
  destination: "./media", //path from app.js not from routes
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

//Fetch Route
router.get("/", noteFetch);

//Delete Route
router.delete(
  "/:noteId",
  // passport.authenticate("jwt", { session: false }),
  deleteNote
);

//Update Route
router.put(
  "/:noteId",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateNote
);

module.exports = router;
