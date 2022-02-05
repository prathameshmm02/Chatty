import { getAuth } from "firebase/auth";
import React from "react";
import "../App.css";

export default function Message(props) {
  const { text, photoURL, uid } = props.message;
  const auth = getAuth();
  return uid === auth.currentUser.uid
    ? sentMessage(text)
    : receivedMessage(text, photoURL, uid);
}

function sentMessage(text) {
  return (
    <div className="message-container sent">
      <p className="message sent">{text}</p>
    </div>
  );
}

function receivedMessage(text, photoURL, uid) {
  return (
    <div className="message-container">
      <img className="user-image" src={photoURL} />
      <p className="message">{text}</p>
    </div>
  );
}
