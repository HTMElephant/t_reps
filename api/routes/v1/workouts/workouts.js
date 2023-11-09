const express = require("express");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { user_id, name, exercises } = req.body;

    const workout = await db.workouts.insert({ user_id, name });

    await db.workout_exercises.insert(
    exercises.map(exercise => ({ exercise_id: exercise.id, workout_id: workout.id }))
    );

    res.json(workout);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
