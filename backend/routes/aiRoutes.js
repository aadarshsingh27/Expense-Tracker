const express = require('express');
const router = express.Router();
const { categorizeText, getInsights } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/categorize', protect, categorizeText);
router.get('/insights', protect, getInsights);

module.exports = router;
