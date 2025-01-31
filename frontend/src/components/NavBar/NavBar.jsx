import { NavLink, Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="NavBar">
      <div className="nav-logo-container">
        <Link to="/">
          <img
            src="/logo-full-moonwalkers.png"
            alt="moonwalkers-logo"
            className="nav-logo"
          />
        </Link>
      </div>
      <div className="nav-link-container">
        <NavLink to="/">Where are we?</NavLink>
        &nbsp;
        {user ? (
          <>
            <NavLink to="/moonwalks" end>
              Moonwalks
            </NavLink>
            &nbsp;
            <NavLink to="/moonwalks/new">Add Moonwalk</NavLink>
            &nbsp; 🏃‍♀️‍➡️🏃‍➡️🏃‍♂️‍➡️ &nbsp;
            <Link to="" onClick={handleLogOut}>
              Log Out
            </Link>
            &nbsp;
            <span>Welcome, {user.name}</span>
          </>
        ) : (
          <>
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;
            <NavLink to="/login">Log In</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
