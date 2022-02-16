import { getAuth } from "firebase/auth";
import React from "react";
import "../App.css";

export default function Message(props) {
  let { text, photoURL, uid } = props.message;
  const auth = getAuth();
  // TODO get username and use it's initials to generate the photo
  photoURL = photoURL ? photoURL : "https://avatars.dicebear.com/api/initials/" + auth.currentUser.email + ".svg"

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
