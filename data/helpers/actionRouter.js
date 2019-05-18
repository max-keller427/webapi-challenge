const express = require("express");

const router = express.Router();

const db = require("./actionModel.js");

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving data" });
  }
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.body);
});

router.post("/", async (req, res) => {
  try {
    const post = await db.insert(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error inserting action" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Action Removed" });
    } else {
      res.status(404).json({ message: "Action could not be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting action" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = await db.update(req.params.id, req.body);
    if (updates) {
      res.status(200).json(updates);
    } else {
      res.status(404).message({ message: "Action not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating action" });
  }
});

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await db.get(id);
    if (action) {
      console.log(req.action);
      req.action = action;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Request could not be processed" });
  }
}
module.exports = router;
