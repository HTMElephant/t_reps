const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const exercises = await db.get_exercises();
    
    res.json(exercises);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
