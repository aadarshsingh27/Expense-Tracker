import React, { useState, useEffect } from 'react';
import { createExpense } from './api';
import './AddExpenseForm.css';
import { useCurrency } from './context/CurrencyContext';

const AddExpenseForm = ({ onExpenseAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();

  useEffect(() => {
    setIsFormValid(description && amount && category);
  }, [description, amount, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const newExpense = {
        description,
        amount: parseFloat(amount),
        category,
      };
      await createExpense(newExpense);
      onExpenseAdded(); // Callback to refresh list
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error("Error adding expense", error);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <h3 className="form-title">
        <i className="fas fa-plus-circle"></i>
        Add New Expense
      </h3>

      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Description (e.g. Groceries)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <i className="fas fa-tag input-icon"></i>
        </div>

        <div className="form-row">
          <div className="input-group">
            <input
              type="number"
              placeholder={`Amount (${currency.symbol})`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <i className="fas fa-coins input-icon"></i>
          </div>

          <div className="input-group">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Stationary">Stationary</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
            <i className="fas fa-list input-icon"></i>
          </div>
        </div>
        <button type="submit" disabled={!isFormValid || loading}>
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
