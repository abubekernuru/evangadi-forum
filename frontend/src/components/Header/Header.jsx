import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/evangai-logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Evangadi Forum" /></Link>
        </div>
        
        {/* Hidden checkbox for mobile menu state */}
        <input type="checkbox" id="nav-toggle" />
        
        {/* Hamburger menu button */}
        <label htmlFor="nav-toggle" className="menu-btn">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </label>
        
        {/* Spacer to push hamburger to the right on mobile */}
        <div className="spacer"></div>
        
        {/* Navigation menu */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/how-it-works" className="nav-link">How it works</Link>
          <Link to="/login" className="nav-link signin-btn">Sign in</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;