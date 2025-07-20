import React, { useState } from 'react';
import './addhobbyform.css';

const AddHobbyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });

  const [submittedHobby, setSubmittedHobby] = useState(null); // for displaying result

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (formData.name.length < 3) {
      alert('Hobby name should be at least 3 characters');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/hobbies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert('✅ Hobby added!');
      setSubmittedHobby(data); // show the saved hobby
      setFormData({ name: '', description: '', category: '' }); // reset form
    } catch (err) {
      console.error('Error adding hobby:', err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add a New Hobby</h2>

        <input
          name="name"
          placeholder="Hobby Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Coding">Coding</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Save Hobby</button>
      </form>

      {submittedHobby && (
        <div className="submitted-hobby">
          <h3>🎉 Hobby Saved!</h3>
          <p><strong>Name:</strong> {submittedHobby.name}</p>
          <p><strong>Description:</strong> {submittedHobby.description}</p>
          <p><strong>Category:</strong> {submittedHobby.category}</p>
        </div>
      )}
    </div>
  );
};

export default AddHobbyForm;
