const { Notebook, Note } = require("../../db/models");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    const notebook = await Notebook.findByPk(notebookId);
    return notebook;
  } catch (error) {
    next(error);
  }
};

//Fetch
exports.notebookFetch = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: {
        model: Note,
        as: "notes",
        attributes: ["id"],
      },
    });
    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};

//Delete
exports.deleteNotebook = async (req, res, next) => {
  try {
    await req.notebook.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// //Update
// exports.notebookUpdate = async (req, res) => {
//   const { notebookId } = req.params;
//   try {
//     if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
//     const foundNotebook = await Notebook.findByPk(notebookId);
//     if (foundNotebook) {
//       await foundNotebook.update(req.body);
//       res.status(204).end(); // ==> no content
//     } else {
//       res.status(404).json({ message: " notebook not found !" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//Create notebook
exports.createNotebook = async (req, res, next) => {
  try {
    //const foundNotebook = await Notebook.findOne({
    // where: { userId: req.user.id },
    // });

    // if (foundNotebook) {
    //   const err = new Error("You already created Store!");
    //   err.status = 400;
    //   return next(err);
    // }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    // req.body.userId = req.user.id;
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

//Create Note
exports.createNote = async (req, res, next) => {
  try {
    // if (req.user.id === req.store.userId) {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.notebookId = req.notebook.id;
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
    // } else {
    //   const err = new Error("Unauthorized|!");
    //   err.status = 401;
    //   return next(err);
    // }
  } catch (error) {
    next(error);
  }
};
