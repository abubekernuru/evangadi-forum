import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import './Header.css';
import logo from '../../assets/evangai-logo.png';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Evangadi Forum" /></Link>
        </div>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username}!</span>
              <Link to="/ask-question" className="nav-link ask-btn">
                Ask Question
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-btn">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;