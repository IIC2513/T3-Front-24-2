import React, { useState } from 'react';
import axios from 'axios';
import './MessageInput.css';

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username');

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post('http://localhost:3000/messages', {
          body: message,
          username: username,
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
