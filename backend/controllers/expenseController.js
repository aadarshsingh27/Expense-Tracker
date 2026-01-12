const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
});

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = asyncHandler(async (req, res) => {
    const { description, amount, category, date } = req.body;

    const expense = new Expense({
        user: req.user._id,
        description,
        amount,
        category,
        date: date || Date.now(),
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (expense) {
        if (expense.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }
        await expense.deleteOne();
        res.json({ message: 'Expense removed' });
    } else {
        res.status(404);
        throw new Error('Expense not found');
    }
});

// @desc    Get monthly summary
// @route   GET /api/expenses/summary/monthly
// @access  Private
const getMonthlySummary = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const summary = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
                date: {
                    $gte: new Date(currentYear, 0, 1),
                    $lt: new Date(currentYear + 1, 0, 1)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$date" },
                totalAmount: { $sum: "$amount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json(summary);
});

// @desc    Get yearly summary
// @route   GET /api/expenses/summary/yearly
// @access  Private
const getYearlySummary = asyncHandler(async (req, res) => {
    const summary = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
            }
        },
        {
            $group: {
                _id: { $year: "$date" },
                totalAmount: { $sum: "$amount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json(summary);
});

module.exports = {
    getExpenses,
    addExpense,
    deleteExpense,
    getMonthlySummary,
    getYearlySummary
};
