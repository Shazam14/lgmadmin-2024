import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/chatbot.css';  // Ensure this path is correct

const LGMSChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Send a message to the Rasa server to trigger the first chatbot message
    const triggerFirstMessage = async () => {
      try {
        const response = await axios.post('http://0.0.0.0:5005/webhooks/rest/webhook', {
          sender: 'test_user',
          message: 'hi'
        });
        const botMessages = response.data.map((msg, index) => ({
          sender: 'bot',
          message: msg.text || <img src={msg.image} alt="bot response" />
        }));
        setMessages(botMessages);
      } catch (error) {
        console.error('Error triggering first message:', error);
      }
    };

    triggerFirstMessage();
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { sender: 'user', message: input };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await axios.post('http://0.0.0.0:5005/webhooks/rest/webhook', {
          sender: 'test_user',
          message: input
        });

        const botMessages = response.data.map((msg, index) => ({
          sender: 'bot',
          message: msg.text || <img src={msg.image} alt="bot response" />
        }));

        setMessages([...messages, newMessage, ...botMessages]);
      } catch (error) {
        console.error('Error sending message to Rasa:', error);
      }
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {typeof msg.message === 'string' ? msg.message : msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default LGMSChatbot;