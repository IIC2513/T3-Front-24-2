import React from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div className="chat-page">
      <div className="app-container">
        <ChatList />
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
