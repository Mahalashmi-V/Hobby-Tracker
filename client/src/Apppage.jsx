import { useNavigate } from 'react-router-dom';
import './App.css'; // External CSS file

const Apppage = () => {
  const navigate = useNavigate();
  

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Hobbies Tracker</h1>
      <p className="home-subtitle">Track and manage your hobbies easily!</p>
      <button className="home-button" onClick={() => navigate('loginform')}>
        Go to Login
      </button>
    </div>
  );
};

export default Apppage;
