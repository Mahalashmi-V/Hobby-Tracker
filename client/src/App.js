import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Apppage';
import DashboardPage from './dashboard';
import AddHobbyPage from './addhobby';
import AddHobbyForm from './addhobbyform';
import LoginForm from './loginform';
import HobbyChart from './hobbychart';
import Congratulations from './congratulate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/addhobby" element={<AddHobbyPage />} />
      <Route path="/addhobbyform" element={<AddHobbyForm />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/congratulate" element={<Congratulations />} />
      <Route path="/hobbychart" element={<HobbyChart />} />
      
    </Routes>
  );
}

export default App;
