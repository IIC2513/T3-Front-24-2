import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CreateChatButton.css';

const CreateChatButton = ({ setChats }) => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

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
      const chatExist = await axios.get(`http://localhost:3000/chats/${username}/${otherUser}`);

      if (chatExist.data) {
        alert('Ya existe un chat con este usuario');
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          const response = await axios.post('http://localhost:3000/chats', { username1: username, username2: otherUser });
          if (response.data) {
            setChats(prevChats => [...prevChats, response.data]);
            setShowUserList(false);
          } else {
            alert('Error creando chat');
          }
        } catch (postError) {
          console.error('Error creating chat:', postError);
          alert('Error creando chat');
        }
      } else {
        console.error('Error checking if chat exists:', error);
        alert('Error comprobando si el chat existe');
      }
    }
  };

  return (
    <div className="create-chat-button-container">
      <button className="create-chat-button" onClick={fetchUsers}>Crear Chat</button>

      {showUserList && (
        <div className="user-list">
          {users.length > 0 ? (
            <>
              <div className="user-item close-button" onClick={() => setShowUserList(false)}>Cerrar</div>
              {users.map((user) => (
                <div 
                  key={user.username} 
                  className="user-item" 
                  onClick={() => createChatWithUser(user.username)}
                >
                  {user.username}
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="user-item close-button" onClick={() => setShowUserList(false)}>Cerrar</div>
              <div className='user-item'>No hay otros usuarios.</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateChatButton;
