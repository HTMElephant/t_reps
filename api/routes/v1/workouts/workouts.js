const express = require("express");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { user_id, name, exercises } = req.body;

    const workout = await db.workouts.insert({ user_id, name });

    await db.workout_exercises.insert(
      exercises.map(exercise => ({
        exercise_id: exercise.id,
        workout_id: workout.id,
      }))
    );

    res.json(workout);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;

    await db.workouts.destroy(id);
    // kill orphans
    await db.workout_exercises.destroy({ workout_id: id });
    await db.workout_histories.destroy({ workout_id: id });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
