const { Note, Notebook } = require("../../db/models");

exports.fetchNote = async (noteId, next) => {
  try {
    const note = await Note.findByPk(noteId);
    return note;
  } catch (error) {
    next(error);
  }
};

//Fetch
exports.noteFetch = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "storeId"] },
      include: {
        model: Notebook,
        as: "notebook",
        attributes: ["title"],
      },
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

//Delete
exports.deleteNote = async (req, res, next) => {
  const foundNotebook = await Notebook.findByPk(req.note.noteId);
  try {
    // if (foundNotebook.userId === req.user.id) {
    //   await req.poster.destroy();
    //   res.status(204).end(); // no content
    // } else {
    //   const err = new Error("Unauthorized!");
    //   err.status = 401;
    //   return next(err);
    // }
  } catch (error) {
    next(error);
  }
};

//Update
exports.updateNote = async (req, res, next) => {
  const foundNotebook = await Notebook.findByPk(req.note.notebookId);
  try {
    // if (foundNotebook.userId === req.user.id) {
    //   if (req.file)
    //     req.body.image = `http://${req.get("host")}/${req.file.path}`;
    //   const updatedPoster = await req.poster.update(req.body);
    //   res.json(updatedPoster);
    // } else {
    //   const err = new Error("Unauthorized!");
    //   err.status = 401;
    //   return next(err);
    // }
  } catch (error) {
    next(error);
  }
};
