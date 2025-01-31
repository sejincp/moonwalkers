import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './Footer.css';

export default function Footerf({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="Footerf">
      <NavLink to="/">Where are we?</NavLink>
      &nbsp;
      {user ? (
        <>
          <NavLink to="/moonwalks" end>
            Community
          </NavLink>
          &nbsp;
          <NavLink to="/moonwalks/new">Add Moonwalk</NavLink>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}
