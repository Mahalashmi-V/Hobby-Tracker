import React, { useState } from 'react';
import './loginform.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // React Router hook

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login check (replace this with real backend call later)
    const validEmail = 'test@example.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
      setErrorMsg('');
      console.log('✅ Login successful!');
      navigate('/congratulate'); // ✅ Navigate on success
    } else {
      setErrorMsg('❌ Oops Something went Wrong Check it');
    }
  };

  const handleGoogleLogin = () => {
    alert('Google login coming soon!');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Hobby Tracker Login</h2>

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <div className="divider">or</div>

        <button type="button" className="google-button" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
