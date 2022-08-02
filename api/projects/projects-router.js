// Write your "projects" router here!
// Write your "projects" router here!

const Projects = require("./projects-model");
const express = require("express");
const router = express.Router();

const {
  validateProjectId,
  validateProject,
} = require("./projects-middleware.js");

// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      next(err);
    });
});

// - [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get("/:id", validateProjectId, (req, res, next) => {
  try {
    res.status(200).json(req.params);
  } catch (err) {
    next(err);
  }
});
// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.post("/", (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "There was an error adding your project" });
    });
});

// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  const { completed, name, description } = req.body;
  if (completed === undefined || !name || !description) {
    res.status(400).json({ message: "Project ID doesn't exist" });
  } else {
    Projects.update(req.params.id, req.body)
      .then(() => {
        return Projects.get(req.params.id);
      })
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
});

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(res.Projects);
  } catch (err) {
    next(err);
  }
});

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get("/:id/actions", async (req, res, next) => {
  Projects.getProjectActions(req.params.id).then((actions) => {
    if (actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(404).json(actions);
    }
  });
});

module.exports = router;
