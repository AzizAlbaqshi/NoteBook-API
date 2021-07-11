//let notebooks = require("../../notebooks"); //Data
const slugify = require("slugify");
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
exports.notebookDelete = (req, res) => {
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
};

//Update
exports.notebookUpdate = (req, res) => {
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
};

//create
exports.notebookCreate = (req, res) => {
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
};
