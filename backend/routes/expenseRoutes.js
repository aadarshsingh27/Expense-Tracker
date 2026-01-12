const express = require('express');
const router = express.Router();
const {
    getExpenses,
    addExpense,
    deleteExpense,
    getMonthlySummary,
    getYearlySummary
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getExpenses).post(protect, addExpense);
router.route('/:id').delete(protect, deleteExpense);
router.route('/summary/monthly').get(protect, getMonthlySummary);
router.route('/summary/yearly').get(protect, getYearlySummary);

module.exports = router;
