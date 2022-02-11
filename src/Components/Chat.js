import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import sendIcon from "../send_icon.svg";
import { getAuth } from "firebase/auth";
/**
 * Chat Messages Component
 */
export default function Chat() {
  const db = getFirestore();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [message, setMessage] = useState("");

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  console.log(messages);
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = getAuth().currentUser;

    await addDoc(messagesRef, {
      createdAt: serverTimestamp(),
      text: message,
      uid: uid,
      photoURL: photoURL,
    });
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages &&
          messages.map((msg) => <Message key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
      </div>
      <form className="chatBox-container" onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          id="chatBox"
          className="form-control"
        />
        <button type="submit" disabled={!message} className="send-icon">
          <img src={sendIcon} alt="Send" />
        </button>
      </form>
    </div>
  );
}