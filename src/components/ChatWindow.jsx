import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';
import './ChatWindow.css';

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/chats/${selectedChat.id}/messages`);
          setMessages(response.data);
        } catch (error) {
          setError(error.response ? error.response.data.message : 'Error fetching messages');
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="chat-window">
        <div className="messages-container">
          <div className="no-chat-selected">Selecciona un chat para comenzar a conversar.</div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="chat-window">Cargando mensajes...</div>;
  if (error) return <div className="chat-window">{error}</div>;

  return (
    <div className="chat-window">
      <div className="messages-container chat-content">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`message ${msg.username === username ? 'sent' : 'received'}`}
            >
              {msg.body}
            </div>
          ))
        ) : (
          <div className='message-text'>No hay mensajes en este chat.</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput chatId={selectedChat.id} />
    </div>
  );
};

export default ChatWindow;
