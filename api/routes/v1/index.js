const express = require("express");
const login = require('./login');
const users = require('./users');
const exercises = require('./exercises');
const workouts = require('./workouts');

const router = express.Router();

router.use('/login', login);
router.use('/users', users);
router.use('/exercises', exercises);
router.use('/workouts', workouts);

module.exports = router;
