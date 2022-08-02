// Write your "actions" router here!
// Write your "actions" router here!
const Actions = require("./actions-model");

const express = require("express");
const router = express.Router();

const { validateActionId, validateAction } = require("./actions-middlware.js");

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      next(err);
    });
});
// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get("/:id", validateActionId, (req, res, next) => {
  try {
    res.status(200).json(req.params);
  } catch (err) {
    next(err);
  }
});
// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// router.post("/", validateAction, validateActionId, (req, res) => {
//   const newAction = req.body;
//   Actions.insert(newAction).then((project) => {
//     res.status(201).json(newAction);
//   });
// });
router.post("/", validateAction, (req, res, next) => {
  //   const newAction = req.body;
  Actions.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(res.Actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
