import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim()) {
      try {
        await axios.post('http://localhost:3000/users', { "username": username });
        
        localStorage.setItem('username', username);
        navigate(`/chats/${username}`);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          localStorage.setItem('username', username);
          navigate(`/chats/${username}`);
        } else {
          setError('Hubo un error al iniciar sesión. Por favor, intenta de nuevo.');
        }
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="TituloBienvenida">Bienvenid@ a WebGram</h1>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
