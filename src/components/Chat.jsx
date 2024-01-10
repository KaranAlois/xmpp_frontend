import axios from "axios";
import React, { useRef } from "react";

function Chat() {
  const messageRef = useRef();
  const handleSend = async () => {
    const res = await axios.post("/", {
      content: messageRef.current.value,
    });
    console.log(res);
  };
  return (
    <div>
      <input ref={messageRef} placeholder="Write a message"></input>
      <button onClick={() => handleSend()}></button>
    </div>
  );
}

export default Chat;
