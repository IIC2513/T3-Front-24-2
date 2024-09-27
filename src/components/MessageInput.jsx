import React, { useState } from 'react';
import axios from 'axios';
import './MessageInput.css';
import { useNavigate } from 'react-router-dom';

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post('http://localhost:3000/messages', {
          body: message,
          sender: username,
          chatId: chatId
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default MessageInput;
