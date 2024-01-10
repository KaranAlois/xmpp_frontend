import React, { useEffect, useState } from "react";

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const ws = new WebSocket("ws://localhost:8080"); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      // Handle incoming messages from the WebSocket server
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      // You might want to handle reconnection logic here
    };

    return () => {
      // Close WebSocket connection when component unmounts
      if (ws) {
        ws.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const sendMessage = () => {
    if (socket) {
      // Example: Sending a message to the WebSocket server
      socket.send("Hello from client!");
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatApp;
