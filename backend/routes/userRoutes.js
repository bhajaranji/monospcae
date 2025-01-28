const express = require('express');
const { loginUser, registerUser } = require('../controller/userController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
