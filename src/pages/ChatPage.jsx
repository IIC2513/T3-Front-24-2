import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import CreateChatButton from '../components/CreateChatButton';
import './ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  return (
    <div className="chat-page">
      <div className="app-container">
        <div className="chat-sidebar">
          <CreateChatButton setChats={setChats} />
          <ChatList setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} />
        </div>
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default ChatPage;
