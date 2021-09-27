const express = require('express');
const router = express.Router();
const { addReview, getReview } = require('../controllers/companyReviews');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, addReview).get(protect, getReview);

module.exports = router;
