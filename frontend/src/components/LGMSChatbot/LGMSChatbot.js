import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Modal, Spinner } from "react-bootstrap";
import { MessageCircle, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import chatbotLogo from "../../assets/images/logos/lgms-hero-section.png";
import "../../styles/lgmschatbot.css";

const LGMSChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await axios.get(`${getRasaServerURL()}/status`);
        setConnectionStatus("connected");
      } catch (error) {
        setConnectionStatus("disconnected");
      }
    };

    if (isOpen) {
      checkConnection();
      const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  const getRasaServerURL = () => {
    const localURL = "http://192.168.0.148:5005";
    const publicURL = "https://lgmschatbot.lgmsmontessori.workers.dev";
    return window.location.hostname === "192.168.0.148" ? localURL : publicURL;
  };

  const saveMessages = useCallback((sid, msgs) => {
    localStorage.setItem(`chatMessages_${sid}`, JSON.stringify(msgs));
  }, []);

  const loadMessages = useCallback((sid) => {
    const savedMessages = localStorage.getItem(`chatMessages_${sid}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem("chatSessionId");
    localStorage.removeItem(`chatMessages_${sessionId}`);
    setSessionId(null);
    setMessages([]);
    console.log("Session cleared");
  }, [sessionId]);

  useEffect(() => {
    if (isOpen) {
      let storedSessionId = localStorage.getItem("chatSessionId");
      if (!storedSessionId) {
        storedSessionId = uuidv4();
        localStorage.setItem("chatSessionId", storedSessionId);
      }
      setSessionId(storedSessionId);
      console.log("Session started/resumed:", storedSessionId);

      const loadedMessages = loadMessages(storedSessionId);
      if (loadedMessages.length > 0) {
        setMessages(loadedMessages);
        setIsLoading(false);
      } else {
        initializeSession(storedSessionId);
      }
    } else {
      // Chat is being closed
      clearSession();
    }
  }, [isOpen, loadMessages, clearSession]);

  const initializeSession = async (sid) => {
    try {
      setIsTyping(true);
      setIsLoading(true);
      const response = await axios.post(
        `${getRasaServerURL()}/webhooks/rest/webhook`,
        {
          sender: sid,
          message: "/session_start",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Session initialized:", sid);
      const botMessages = response.data.map((msg) => ({
        sender: "bot",
        message: msg.text || <img src={msg.image} alt="bot response" />,
        buttons: msg.buttons,
      }));
      setMessages(botMessages);
      saveMessages(sid, botMessages);
    } catch (error) {
      console.error("Error initializing session:", error);
      setError("Failed to start a new session. Please try again.");
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText = input) => {
    console.log("Type of messageText:", typeof messageText);
    console.log("messageText:", messageText);
    // Convert messageText to string and trim
    const message = typeof messageText === 'string' ? messageText.trim() : JSON.stringify(messageText);
    console.log("Sending message:", message); // Log the message being sent
  
    if (message) {
      const newMessage = { sender: "user", message: message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setIsTyping(true);
  
      try {
        const response = await axios.post(
          `${getRasaServerURL()}/webhooks/rest/webhook`,
          {
            sender: sessionId,
            message: message,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("Full Rasa response:", JSON.stringify(response.data, null, 2));
  
        const botMessages = response.data.map((msg) => {
          console.log("Processing message:", msg);
          return {
            sender: "bot",
            message: msg.text || <img src={msg.image} alt="bot response" />,
            buttons: msg.buttons,
          };
        });
  
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, ...botMessages];
          saveMessages(sessionId, updatedMessages);
          return updatedMessages;
        });
      } catch (error) {
        console.error("Error sending message to Rasa:", error);
        setError("Failed to send message. Please try again.");
      } finally {
        setIsTyping(false);
      }
    } else {
      console.warn("Attempted to send an empty message");
    }
  };

  const handleButtonClick = (button) => {
    console.log("Button clicked:", button);  // Log the entire button object
    if (button && (typeof button.payload === 'string' || typeof button.title === 'string')) {
      const messageToSend = button.payload || button.title;
      console.log("Sending button message:", messageToSend);
      sendMessage(messageToSend);
    } else {
      console.error("Invalid button structure:", button);
    }
  };

  const handleClose = async () => {
    try {
      await sendMessage("/goodbye");
      console.log("Goodbye message sent");
    } catch (error) {
      console.error("Error sending goodbye message:", error);
    } finally {
      clearSession();
      onClose();
    }
  };

  const retryConnection = () => {
    setError(null);
    initializeSession(sessionId);
  };

  return (
    <>
      <Button
        onClick={() => (isOpen ? handleClose() : onClose())}
        className="chat-toggle-button"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName="chat-modal"
        contentClassName="chat-modal-content"
      >
        <Modal.Header closeButton>
          <img
            src={chatbotLogo}
            alt="Chatbot Logo"
            style={{ width: "30px", marginRight: "10px" }}
          />
          <Modal.Title>LGMS Chatbot</Modal.Title>
          <div className={`connection-status ${connectionStatus}`}>
            {connectionStatus === "connected" ? "Connected" : "Disconnected"}
          </div>
        </Modal.Header>
        <Modal.Body className="chat-modal-body">
          {isLoading ? (
            <div className="loading-container">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <Button onClick={retryConnection}>Retry</Button>
            </div>
          ) : (
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p>{msg.message}</p>
                  {msg.buttons && (
                    <div className="button-container">
                    {msg.buttons.map((button, buttonIndex) => (
                      <button
                        key={buttonIndex}
                        onClick={() => handleButtonClick(button)}  // Pass the entire button object
                        className="option-button"
                        title={`Payload: ${button.payload}, Title: ${button.title}`}
                      >
                        {button.title}
                      </button>
                    ))}
                  </div>
                  )}
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
          )}
        </Modal.Body>
        <Modal.Footer className="chat-modal-footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                sendMessage(input);
              }}}
            placeholder="Type your message..."
            className="chat-input"
            disabled={isLoading || !!error}
          />
          <Button
            onClick={() => sendMessage(input)}
            className="chat-send-button"
            disabled={isLoading || !!error}
          >
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
          background-color: #4caf50;
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
          width: 400px;
          margin: 0;
        }

        .chat-modal-content {
          border-radius: 20px;
          overflow: hidden;
        }

        .chat-modal-body {
          height: 350px;
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
          background-color: #4caf50;
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
          background-color: #4caf50;
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
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 5px;
        }

        .option-button {
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 15px;
          padding: 5px 10px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .option-button:hover {
          background-color: #45a049;
        }
        .connection-status {
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 10px;
          margin-left: auto;
        }

        .connection-status.connected {
          background-color: #4caf50;
          color: white;
        }

        .connection-status.disconnected {
          background-color: #f44336;
          color: white;
        }
        .connection-status {
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 10px;
          margin-left: auto;
        }

        .connection-status.connected {
          background-color: #4caf50;
          color: white;
        }

        .connection-status.disconnected {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </>
  );
};

export default LGMSChatbot;
