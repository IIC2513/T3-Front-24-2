import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats/:username" element={<ChatPage />} />
        <Route path="/chats/:username/:chatId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
