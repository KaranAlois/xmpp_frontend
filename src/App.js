import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const ws = new WebSocket("ws://localhost:8080"); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(ws);
      const body = {
        jid: "jignesh@xmpp.akinolabs.com",
        password: "password",
        host: "xmpp.akinolabs.com",
        port: 5222,
      };
      const data = JSON.stringify({ type: "login_data", data: body });
      ws.send(data);
    };

    ws.onmessage = (event) => {
      // Handle incoming messages from the WebSocket server
      const message = event.data;
      console.log(event.data);
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
      const data = JSON.stringify({
        type: "message",
        receiver: "karan@xmpp.akinolabs.com",
        message: messageRef.current.value,
      });
      socket.send(data);
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <input ref={messageRef} placeholder="Write message here!"></input>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
