import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import MoonwalkListPage from '../MoonwalkListPage/MoonwalkListPage';
import NewMoonwalkPage from '../NewMoonwalkPage/NewMoonwalkPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

import moonBackground from '../../assets/moon-processed.png';
import secondBackground from '../../assets/second-background.jpg';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [bgSize, setBgSize] = useState(100);

  return (
    <main
      className="App"
      style={{
        backgroundImage: `url(${moonBackground})`,
        backgroundSize: `${Math.min(bgSize, 3000)}px`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 20%',
        minHeight: '100vh',
      }}
    >
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route
              path="/"
              element={<HomePage bgSize={bgSize} setBgSize={setBgSize} />}
            />
            <Route
              path="/moonwalks"
              element={<MoonwalkListPage user={user} />}
            />
            <Route path="/moonwalks/new" element={<NewMoonwalkPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<HomePage bgSize={bgSize} setBgSize={setBgSize} />}
            />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/moonwalks/*" element={<Navigate to="/login" />} />
            <Route path="/moonwalks/new" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </section>
      <Footer user={user} setUser={setUser} />
    </main>
  );
}
