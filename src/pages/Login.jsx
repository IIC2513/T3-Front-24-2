import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/chats');
    }
  };

  return (
    <>
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
        </div>
    </>
  );
};

export default Login;
