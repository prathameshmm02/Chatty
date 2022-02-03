import React from "react";
import "../App.css";

export default function Message({ username , message, imageLink, isFromUser }) {
  return (
      isFromUser ?
    <div className="message-container">
      <img className="user-image" src={imageLink} alt="User Photo" />
      <div className="text-container">
          <h6 className="user-name">{username}</h6>
        <p className="message">{message}</p>
      </div>
    </div> :
    <div className="message-container user">
    <div className="text-container user"> 
      <p className="message">{message}</p>
    </div>
  </div> 
  );
}
Message.defaultProps = {
  username: "User",
  message: "lorem dfg fdkhbgjhbghfbgjhfbghjfbgjhbfg hdfg g sfjhkbgjdhfb fjhbds jhsdffjsdbfjhsd bgdsjhfbdjhgdjhgahjasgyuhgayugdfuy gfyu gyud gf",
  date: "0",
  isFromUser : true,
  imageLink:
    "https://images.unsplash.com/photo-1638913974023-cef988e81629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
};
