const { Notebook } = require("../../db/models");

//Fetch
exports.notebookFetch = async (req, res) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(notebooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete
exports.notebookDelete = async (req, res) => {
  const { notebookId } = req.params;
  try {
    const foundNotebook = await Notebook.findByPk(notebookId);
    if (foundNotebook) {
      await foundNotebook.destroy();
      res.status(204).end(); // ==> no content
    } else {
      res.status(404).json({ message: " notebook not found !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update
exports.notebookUpdate = async (req, res) => {
  const { notebookId } = req.params;
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const foundNotebook = await Notebook.findByPk(notebookId);
    if (foundNotebook) {
      await foundNotebook.update(req.body);
      res.status(204).end(); // ==> no content
    } else {
      res.status(404).json({ message: " notebook not found !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create
exports.notebookCreate = async (req, res) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
