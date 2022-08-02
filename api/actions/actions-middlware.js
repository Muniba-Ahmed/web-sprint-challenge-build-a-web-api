// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "action not found with that ID" });
    } else {
      req.params = action;
      next();
    }
  } catch (err) {
    req.status(500).json({ message: "error! action not found" });
  }
}

async function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (
    !description ||
    !notes ||
    !project_id === req.params.id ||
    completed === undefined
  ) {
    res.status(400).json({ message: "missing required field(s)" });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
