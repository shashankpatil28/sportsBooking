// src/AppRouter.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Schedule from './pages/Schedule';

const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;
