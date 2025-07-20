// src/components/Congratulations.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './congratulate.css';

const Congratulations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="congrats-container">
      <h1 className="blast">🎉 Congratulations! 🎉</h1>
      <p>You're logged in successfully.</p>
    </div>
  );
};

export default Congratulations;
