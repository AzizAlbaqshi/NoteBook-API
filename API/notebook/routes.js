const express = require("express");
const {
  notebookFetch,
  deleteNotebook,
  // notebookUpdate,
  createNotebook,
  createNote,
  fetchNotebook,
} = require("./controllers");
const multer = require("multer");

const router = express.Router(); // method from Express "Router"

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

//Parameter
router.param("notebookId", async (req, res, next, notebookId) => {
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const error = new Error("notebook Not Found");
    error.status = 404;
    next(error);
  }
});

//Fetch (List) Route
router.get("/", notebookFetch);

//Delete Route
router.delete("/:notebookId", deleteNotebook);

//Update Route
//router.put("/:notebookId", upload.single("image"), notebookUpdate);

// Create Route
router.post("/", upload.single("image"), createNotebook);

//create poster
router.post(
  "/:notebookId/notes",
  //passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createNote
);

module.exports = router;
