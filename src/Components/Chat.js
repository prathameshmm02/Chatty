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
import { getAuth } from "firebase/auth";
import { Button, Form, FormControl } from "react-bootstrap";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
/**
 * Chat Messages Component
 */
export default function Chat({id}) {
  const db = getFirestore();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [message, setMessage] = useState("");

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { displayName, photoURL, email } = getAuth().currentUser;

    await addDoc(messagesRef, {
      createdAt: serverTimestamp(),
      text: message,
      displayName: displayName,
      photoURL: photoURL,
      email : email
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
      <Form className="chatBox-container" onSubmit={sendMessage}>
        <FormControl
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          id="chatBox"
          className="form-control"
        />
        <Button
          variant="light"
          type="submit"
          disabled={!message}
          className="send-icon"
        >
          <SendRoundedIcon />
        </Button>
      </Form>
    </div>
  );
}
