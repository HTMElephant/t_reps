const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { email, password } = req.body;

    if (!email) {
      next(new Error("you should provide an email"));
    }
    if (!password) {
      next(new Error("you should provide a password"));
    }

    const [user] = await db.get_user_by_credentials({ email, password });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
