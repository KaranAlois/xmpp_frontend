import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const userRef = useRef();
  const handleClick = () => {
    console.log(userRef, passwordRef);
    navigate("/chat");
  };

  return (
    <div>
      <input
        style={{ margin: "3px" }}
        ref={userRef}
        placeholder="User Name"
      ></input>
      <br />
      <input
        style={{ margin: "3px" }}
        ref={passwordRef}
        placeholder="Password"
      ></input>
      <br />
      <button onClick={() => handleClick()} style={{ margin: "3px" }}>
        Log In
      </button>
    </div>
  );
}

export default Login;
