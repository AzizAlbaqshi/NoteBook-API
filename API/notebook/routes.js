const express = require("express");
const {
  notebookFetch,
  notebookDelete,
  notebookUpdate,
  notebookCreate,
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

//Fetch (List) Route
router.get("/", notebookFetch);

//Delete Route
router.delete("/:notebookId", notebookDelete);

//Update Route
router.put("/:notebookId", upload.single("image"), notebookUpdate);

// Create Route
router.post("/", upload.single("image"), notebookCreate);

module.exports = router;
