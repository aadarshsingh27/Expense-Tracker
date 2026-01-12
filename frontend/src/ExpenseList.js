import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { useCurrency } from './context/CurrencyContext';
import './ExpenseList.css';

// Simple check for Rupee symbol support; if not, we use code.
// For robust support, we would load a custom font (base64). 
// Since we don't have a local font file, we will try to use the symbol directly 
// but if it fails, the user prefers symbol so we will try to enforce UTF-8.


const ExpenseList = ({ expenses, deleteExpense }) => {
  const { currency } = useCurrency();
  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code
    }).format(amount);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Expense Report', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableColumn = ["Date", "Description", "Category", "Amount"];
    const tableRows = [];

    expenses.forEach(expense => {
      // Use code (e.g. INR 500) instead of symbol for PDF safety
      const amountStr = `${currency.code} ${expense.amount.toFixed(2)}`;

      const expenseData = [
        new Date(expense.date).toLocaleDateString(),
        expense.description,
        expense.category,
        amountStr
      ];
      tableRows.push(expenseData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229] }, // Indigo 600
    });

    doc.save(`expense_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="expense-list">
      <div className="expense-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: 0 }}>Expenses</h2>
        {expenses.length > 0 && (
          <button onClick={downloadPDF} className="btn-export" style={{
            background: 'var(--bg-subtle)',
            color: 'var(--primary)',
            border: '1px solid var(--primary)',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fas fa-file-pdf"></i>
            Export PDF
          </button>
        )}
      </div>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <>
          <ul className="expense-items">
            {expenses.map(expense => (
              <li key={expense._id} className="expense-item">
                <div className="expense-info">
                  <span className="expense-desc">{expense.description}</span>
                  <span className={`expense-cat cat-${expense.category ? expense.category.toLowerCase() : 'other'}`}>
                    {expense.category}
                  </span>
                  <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <div className="expense-actions">
                  <span className="expense-amount">{formatAmount(expense.amount)}</span>
                  <button className="delete-btn" onClick={() => deleteExpense(expense._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: {formatAmount(totalAmount)}</h3>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
