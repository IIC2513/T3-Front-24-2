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
        const chatsData = response.data;

        const chatsWithLastMessage = await Promise.all(
          chatsData.map(async (chat) => {
            try {
              const messagesResponse = await axios.get(`http://localhost:3000/chats/${chat.id}/messages`);
              const messages = messagesResponse.data;
              const lastMessage = messages.length > 0 ? messages[messages.length - 1].body : 'No hay mensajes aún';
              return { ...chat, lastMessage };
            } catch (error) {
              console.error(`Error fetching messages for chat ${chat.id}:`, error);
              return { ...chat, lastMessage: 'Error al cargar el mensaje' };
            }
          })
        );

        setChats(chatsWithLastMessage);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [username, setChats]);

  const deleteChat = async (chatId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este chat?')) {
      try {
        await axios.delete(`http://localhost:3000/chats/${chatId}`);
        
        setChats(chats.filter(chat => chat.id !== chatId));
        navigate(`/chats/${username}`);
        setSelectedChat(null);
      } catch (error) {
        console.error('Error deleting chat:', error);
        alert('Hubo un error al eliminar el chat. Por favor, intenta de nuevo.');
      }
    }
  };

  if (loading) return <div>Cargando chats...</div>;

  return (
    <div className="chat-list">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div 
            key={chat.id} 
            className="chat-item"
          >
            <div 
              className="chat-details"
              onClick={() => { setSelectedChat(chat); navigate(`/chats/${username}/${chat.id}`); }}
            >
              <div className="chat-name">{chat.username1 === username ? chat.username2 : chat.username1}</div>
              <div className="chat-last-message">{chat.lastMessage}</div>
            </div>
            <button 
              className="delete-chat-button"
              onClick={() => deleteChat(chat.id)}
            >
              ×
            </button>
          </div>
        ))
      ) : (
        <div className="no-chats">No tienes ningún chat aún.</div>
      )}
    </div>
  );
};

export default ChatList;
