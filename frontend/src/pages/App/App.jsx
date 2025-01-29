import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import MoonwalkDetailPage from '../MoonwalkDetailPage/MoonwalkDetailPage';
import MoonwalkListPage from '../MoonwalkListPage/MoonwalkListPage';
import NewMoonwalkPage from '../NewMoonwalkPage/NewMoonwalkPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/moonwalks" element={<MoonwalkListPage />} />
            <Route path="/moonwalks/:moonwalkId" element={<MoonwalkDetailPage />} />
            <Route path="/moonwalks/new" element={<NewMoonwalkPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}
