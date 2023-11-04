const express = require("express");
const login = require('./login');
const users = require('./users');
const exercises = require('./exercises');

const router = express.Router();

router.use('/login', login);
router.use('/users', users);
router.use('/exercises', exercises);

module.exports = router;
