import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import NavbarTwo from './components/navigation2';
import Login from './pages/login.page';
import Register from './pages/register.page';
import Home from './pages/home.page';
import Calendar from './pages/calendar';
import TasksPage from './pages/tasks.page';
import TeamsPage from './pages/teams.page';
import Profile from './pages/profile.page';
import GoogleConnect from './components/connectGoogle';
import OutlookConnect from './components/connectOutlook';
import Contact from './pages/contact.page';
import AboutUs from './pages/about.page';
import PricingPage from './pages/pricing.page';
import Layout from './pages/layout';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token')); // Change this to `true` to test authenticated routes

  useEffect(() => {
    setLoggedIn(localStorage.getItem('token'));
  }, [loggedIn]);

  const isLoggedIn = React.useMemo(() => !!loggedIn, [loggedIn]);
  return (
    <Router>
      <NavbarTwo isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<>
          <Home />
          <AboutUs />
          <Contact />
        </>} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/google" element={<GoogleConnect />} />
        <Route path="/outlook" element={<OutlookConnect />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isLoggedIn} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
