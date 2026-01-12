const asyncHandler = require('express-async-handler');
const { categorizeExpense, generateInsights } = require('../services/aiService');
const Expense = require('../models/Expense');

// @desc    Categorize expense from text
// @route   POST /api/ai/categorize
// @access  Private
const categorizeText = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400);
        throw new Error('Please provide text to categorize');
    }

    const result = await categorizeExpense(text);
    res.json(result);
});

// @desc    Get spending insights
// @route   GET /api/ai/insights
// @access  Private
const getInsights = asyncHandler(async (req, res) => {
    // Get last 30 days expenses for context
    const expenses = await Expense.find({
        user: req.user._id,
    }).sort({ date: -1 }).limit(50); // Limit to last 50 transactions to avoid token limits

    const insights = await generateInsights(expenses);
    res.json(insights);
});

module.exports = { categorizeText, getInsights };
