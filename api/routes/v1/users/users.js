const express = require("express");

const router = express.Router();

router.get("/:id/workouts", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { id } = req.params;

    const workouts = await db.get_workouts_by_user_id({ id });

    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
