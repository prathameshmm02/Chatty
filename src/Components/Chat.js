import React from "react";
import Message from "./Message";
import {
  getFirestore,
  collection,
  query,
  limit,
  orderBy,
  doc, setDoc, serverTimestamp
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import sendIcon from '../send_icon.svg';
import { getAuth } from "firebase/auth";
/**
 * Chat Messages Component
 */
export  default function Chat() {
  const db = getFirestore();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages, loading, error, snapshot] = useCollectionData(q, { idField: "id" });

  const sendMessage = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "messages", "P"), {
      createdAt: serverTimestamp(),
      id : 448848489, 
      text: document.getElementById("chatBox").value,
      uid: getAuth().currentUser.uid
    })
  }

  return (
    <div>
      <h1>Chatty</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <div>
        {messages &&
          messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))
        }
      </div>
      <div>
        <input type="text" id="chatBox" />
        <button onClick={sendMessage}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}