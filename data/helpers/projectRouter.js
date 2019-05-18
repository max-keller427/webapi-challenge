const express = require("express");

const router = express.Router();

const db = require("./projectModel.js");

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(201).json({ projects });
  } catch (err) {
    res.status(500).json({ message: "cannot get info" });
  }
});

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", async (req, res) => {
  try {
    const post = await db.insert(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error inserting" });
  }
});

router.delete("/:id", validateId, async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Project Removed" });
    } else {
      res.status(404).json({ message: "Project cannot be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error removing project" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await db.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project cannot be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating project" });
  }
});

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await db.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Request could not be processed" });
  }
}

module.exports = router;
