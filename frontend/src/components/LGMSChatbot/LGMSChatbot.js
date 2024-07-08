import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { MessageCircle, X } from 'lucide-react';
import chatbotLogo from "../../assets/images/logos/lgms-hero-section.png"

const LGMSChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getRasaServerURL = () => {
    const localURL = 'http://192.168.0.148:5005/webhooks/rest/webhook';
    const publicURL = 'https://lgmschatbot.lgmsmontessori.workers.dev/webhooks/rest/webhook';
    return window.location.hostname === '192.168.0.148' ? localURL : publicURL;
  };

  useEffect(() => {
    if (isOpen) {
      triggerFirstMessage();
    }
  }, [isOpen]);

  const triggerFirstMessage = async () => {
    try {
      setIsTyping(true);
      const response = await axios.post(getRasaServerURL(), {
        sender: 'test_user',
        message: 'hi'
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const botMessages = response.data.map((msg) => ({
        sender: 'bot',
        message: msg.text || <img src={msg.image} alt="bot response" />
      }));
      setMessages(botMessages);
    } catch (error) {
      console.error('Error triggering first message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { sender: 'user', message: input };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await axios.post(getRasaServerURL(), {
          sender: 'test_user',
          message: input
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const botMessages = response.data.map((msg) => ({
          sender: 'bot',
          message: msg.text || <img src={msg.image} alt="bot response" />
        }));

        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      } catch (error) {
        console.error('Error sending message to Rasa:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <>
      <Button
        onClick={onClose}
        className="chat-toggle-button"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </Button>

      <Modal
        show={isOpen}
        onHide={onClose}
        dialogClassName="chat-modal"
        contentClassName="chat-modal-content"
      >
        <Modal.Header closeButton>
        <img src={chatbotLogo} alt="Chatbot Logo" style={{width: '30px', marginRight: '10px'}} />
          <Modal.Title>LGMS Chatbot</Modal.Title>
        </Modal.Header>
        <Modal.Body className="chat-modal-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {typeof msg.message === 'string' ? msg.message : msg.message}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="chat-modal-footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="chat-input"
          />
          <Button onClick={sendMessage} className="chat-send-button">
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .chat-toggle-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #4CAF50;
          color: white;
          border: none;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chat-toggle-button:hover {
          background-color: #45a049;
          transform: scale(1.05);
        }

        .chat-modal {
          position: fixed;
          bottom: 100px;
          right: 20px;
          width: 350px;
          margin: 0;
        }

        .chat-modal-content {
          border-radius: 20px;
          overflow: hidden;
        }

        .chat-modal-body {
          height: 300px;
          overflow-y: auto;
          padding: 15px;
          background-color: #f5f5f5;
        }

        .chat-modal-footer {
          display: flex;
          padding: 10px;
          background-color: white;
        }

        .chat-input {
          flex-grow: 1;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 8px 15px;
          margin-right: 10px;
        }

        .chat-send-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 15px;
        }

        .message {
          max-width: 80%;
          margin-bottom: 10px;
          padding: 8px 15px;
          border-radius: 18px;
          font-size: 14px;
        }

        .message.user {
          background-color: #4CAF50;
          color: white;
          align-self: flex-end;
          margin-left: auto;
        }

        .message.bot {
          background-color: #e0e0e0;
          color: black;
          align-self: flex-start;
        }

        .typing {
          display: flex;
          align-items: center;
          height: 30px;
        }

        .dot {
          height: 8px;
          width: 8px;
          background-color: #999;
          border-radius: 50%;
          margin: 0 2px;
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default LGMSChatbot;