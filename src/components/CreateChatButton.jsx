import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CreateChatButton.css';

const CreateChatButton = ({ setChats }) => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const availableUsers = response.data.filter(user => user.username !== username);
      setUsers(availableUsers);
      setShowUserList(!showUserList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createChatWithUser = async (otherUser) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${username}/chats`);
      const existingChat = response.data.find(chat =>
        (chat.user1 === username && chat.user2 === otherUser) ||
        (chat.user1 === otherUser && chat.user2 === username)
      );

      if (existingChat) {
        setAlertMessage(`Ya existe un chat con el usuario ${otherUser}.`);
        return;
      }

      const newChatResponse = await axios.post('http://localhost:3000/chats', {
        user1: username,
        user2: otherUser,
      });
      setChats(prevChats => [...prevChats, newChatResponse.data]);
      setShowUserList(false);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="create-chat-button-container">
      <button className="create-chat-button" onClick={fetchUsers}>Crear Chat</button>

      {showUserList && (
        <div className="user-list">
          {users.length > 0 ? (
            <>
                {alertMessage && (
                    <div className="alert-message">
                    {alertMessage}
                    </div>
                )}
                {users.map((user) => (
                <div 
                    key={user.username} 
                    className="user-item" 
                    onClick={() => createChatWithUser(user.username)}
                >
                    {user.username}
                </div>
                ))}
                <div className="user-item close-button" onClick={() => setShowUserList(false)}>Cerrar</div>
            </>
          ) : (
            <div>No hay otros usuarios disponibles</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateChatButton;
