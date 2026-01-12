import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCurrency } from './context/CurrencyContext';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { user, logout, deleteAccount } = useAuth();
  const { currency, changeCurrency } = useCurrency();
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={require('./logo-new.png')} alt="Logo" className="logo-img" />
          SpendSmart
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <select
              value={currency.code}
              onChange={(e) => changeCurrency(e.target.value)}
              className="currency-selector"
            >
              <option value="INR">🇮🇳 INR</option>
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
              <option value="GBP">🇬🇧 GBP</option>
            </select>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/track" className="nav-links" onClick={closeMobileMenu}>
                  Track Expenses
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-links" style={{ cursor: 'default' }}>Hello, {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="nav-links-mobile" onClick={handleLogout}>
                  Logout
                </button>
                <span className="nav-links" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-links nav-delete-btn"
                  title="Delete Account"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This permanently removes all your data and cannot be undone.')) {
                      deleteAccount();
                    }
                  }}
                >
                  <i className="fas fa-trash-alt" style={{ marginRight: '8px' }}></i>
                  Delete Profile
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links" onClick={closeMobileMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
