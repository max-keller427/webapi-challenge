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

module.exports = router;
