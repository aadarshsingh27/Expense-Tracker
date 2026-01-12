import React, { useState, useEffect, useCallback } from 'react';
import AddExpenseForm from '../AddExpenseForm';
import ExpenseList from '../ExpenseList';
import AiInsights from '../components/AiInsights';
import { fetchExpenses, deleteExpense } from '../api';
import './TrackExpenses.css';

const TrackExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadExpenses = useCallback(async () => {
        try {
            const { data } = await fetchExpenses();
            setExpenses(data);
        } catch (error) {
            console.error("Error loading expenses", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error("Error deleting expense", error);
            alert("Failed to delete expense");
        }
    };

    return (
        <div className="track-expenses-page container">
            <div className="dashboard-header">
                <h1>Expense Dashboard</h1>
                <p className="dashboard-subtitle">Manage your finances and view insights</p>
            </div>

            <AiInsights expenses={expenses} />

            <div className="dashboard-grid">
                <div className="dashboard-left">
                    <AddExpenseForm onExpenseAdded={loadExpenses} />
                </div>
                <div className="dashboard-right">
                    {loading ? (
                        <p>Loading expenses...</p>
                    ) : (
                        <ExpenseList expenses={expenses} deleteExpense={handleDelete} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackExpenses;
