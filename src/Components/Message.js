import { getAuth } from "firebase/auth";
import React from "react";
import "../App.css";

export default function Message(props) {
  const {text, uid, photoURL} = props.message;
  const auth = getAuth();
  return uid == auth.currentUser.uid ? sentMessage(text) : receivedMessage(text, photoURL, uid);
}

function sentMessage(text) {
  return (
    <div className="message-container user">
      <div className="text-container user">
        <p className="message">{text}</p>
      </div>
    </div>
  );
}

function receivedMessage(text, photoURL, uid) {
  return (
    <div className="message-container">
      <img className="user-image" src={photoURL} alt="User Photo" />
      <div className="text-container">
        <h6 className="user-name">{uid}</h6>
        <p className="message">{text}</p>
      </div>
    </div>
  );
}