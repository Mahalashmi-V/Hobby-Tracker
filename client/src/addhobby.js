import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddHobbyPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Hobby:', { name, description });
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2>Add a New Hobby</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Hobby Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Hobby Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="btn" type="submit">Save Hobby</button>
      </form>
    </div>
  );
};

export default AddHobbyPage;
