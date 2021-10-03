const express = require('express');
const { register, login, profile } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/profile').get(protect, profile);

module.exports = router;
