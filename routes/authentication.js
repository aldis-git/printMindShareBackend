const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authentication.js');

const router = express.Router();

const { protect, authorize } = require('../middleware/authentication.js');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, authorize('user', 'admin', 'owner'), getMe);

module.exports = router;
