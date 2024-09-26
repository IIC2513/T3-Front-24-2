// ChatWindow.jsx
import React from 'react';
import MessageInput from './MessageInput';
import './ChatWindow.css';

const ChatWindow = () => {
  const messages = [
    { id: 1, sender: 'Juan', text: 'Hola, ¿cómo estás?' },
    { id: 2, sender: 'You', text: 'Bien, gracias. ¿Y tú?' },
    { id: 3, sender: 'Juan', text: 'Muy bien, gracias por preguntar.' },
  ];

  return (
    <>
        <div className="chat-window">
            <div className="chat-header">

            </div>
            <div className="messages-container">
                {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                        {msg.text}
                </div>
            ))}
            </div>
            <MessageInput />
        </div>
    </>
  );
};

export default ChatWindow;
