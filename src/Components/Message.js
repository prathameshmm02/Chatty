import { getAuth } from "firebase/auth";
import randomColor from "randomcolor";
import React from "react";
import "../App.css";

export default function Message(props) {
  let { text, photoURL, displayName } = props.message;
  const auth = getAuth();
  if (photoURL == null) {
    photoURL =
      "https://avatars.dicebear.com/api/initials/" + displayName + ".svg";
  }
  console.log(displayName);
  console.log(auth.currentUser.displayName);
  console.log(displayName === auth.currentUser.displayName);
  return displayName === auth.currentUser.displayName
    ? sentMessage(text)
    : receivedMessage(text, photoURL, displayName);
}

function sentMessage(text) {
  return (
    <div className="message-container sent">
      <p className="message sent">{text}</p>
    </div>
  );
}

function receivedMessage(text, photoURL, name) {
  return (
    <div className="message-container">
      <img className="user-image" src={photoURL} />
      <div className="message">
        <h6 style={{color : randomColor()}} className="m-0">{name}</h6>
        <p className="m-0">{text}</p>
      </div>
    </div>
  );
}
