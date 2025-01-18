import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Navbar from './components/navigation';
import NavbarTwo from './components/navigation2';
import Login from './pages/login.page';
import Register from './pages/register.page';
import Home from './pages/home.page';
import Calendar from './components/calendar';
import TasksPage from './pages/tasks.page';
import TeamsPage from './pages/teams.page';
import Profile from './pages/profile.page';

const About = () => <h1>About Us</h1>;
const Dashboard = () => <h1>Dashboard</h1>;

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const isLoggedIn = false; // Change this to `true` to test authenticated routes

  return (
    <Router>
      <NavbarTwo isLoggedIn={true} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
