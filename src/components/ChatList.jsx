import React from 'react';
import './ChatList.css';

const ChatList = () => {
  const chats = [
    { id: 1, name: 'Juan Pérez', lastMessage: 'Hola, ¿cómo estás?' },
    { id: 2, name: 'Ana López', lastMessage: 'Nos vemos mañana.' },
    { id: 3, name: 'Carlos Ruiz', lastMessage: '¡Gracias!' },
  ];

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat.id} className="chat-item">
          <div className="chat-name">{chat.name}</div>
          <div className="chat-last-message">{chat.lastMessage}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
