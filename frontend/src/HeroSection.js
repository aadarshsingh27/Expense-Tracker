import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './HeroSection.css';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <div className="hero-section-wrapper">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Control Your Money,<br /> Control Your Life</h1>
          <p>AI-powered expense tracking to help you save more and spend wisely.</p>
          <div className="hero-btns">
            {user ? (
              <>
                <Link to="/track" className="btn btn-primary">Go to Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
              </>
            )}

          </div>
        </div>
        <div className="hero-image">
          <img src={require('./hero-img.png')} alt="Finance Illustration" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
