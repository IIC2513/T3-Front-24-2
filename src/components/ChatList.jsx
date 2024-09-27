import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatList.css';

const ChatList = ({ setSelectedChat, chats, setChats }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${username}/chats`);
        setChats(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [username, setChats]);

  if (loading) return <div>Cargando chats...</div>;

  return (
    <div className="chat-list">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div 
            key={chat.id} 
            className="chat-item"
            onClick={() => {setSelectedChat(chat); navigate(`/chats/${username}/${chat.id}`)}}
          >
            <div className="chat-name">{chat.user1 === username ? chat.user2 : chat.user1}</div>
            <div className="chat-last-message">{chat.lastMessage || 'No hay mensajes aún'}</div>
          </div>
        ))
      ) : (
        <div className="no-chats">No tienes ningún chat aún.</div>
      )}
    </div>
  );
};

export default ChatList;
