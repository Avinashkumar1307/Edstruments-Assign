import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/auth/authSlice';
import Login from './components/Login';
import TaskManagement from './components/TaskManagement';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/tasks" /> : <Login />} />
        <Route path="/tasks" element={user ? <TaskManagement /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
