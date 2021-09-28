const express = require('express');
const router = express.Router();
const { addReview } = require('../controllers/companyReviews');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, addReview);

module.exports = router;
