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
import { Button, Form, FormControl, ProgressBar } from "react-bootstrap";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { useAlert } from "react-alert";
import useStorage from "../hooks/useStorage";
/**
 * Chat Messages Component
 */
export default function Chat({ id }) {
  const db = getFirestore();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [message, setMessage] = useState("");

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [file, setFile] = useState(null);

  const types = ["image/png", "image/jpeg", "image/gif"];

  const alert = useAlert();
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      alert.show("Please select an image file (png, jpg or gif)");
    }
    console.log(selected);
  };

  const { progress, mediaUrl } = useStorage(file);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { displayName, photoURL, email } = getAuth().currentUser;

    await addDoc(messagesRef, {
      id: Date.now(),
      createdAt: serverTimestamp(),
      text: message,
      displayName: displayName,
      photoURL: photoURL,
      email: email,
    });
    setMessage("");
  };

  useEffect(() => {
    if (mediaUrl) {
      setFile(null);
      const { displayName, photoURL, email } = getAuth().currentUser;

      addDoc(messagesRef, {
        id: Date.now(),
        createdAt: serverTimestamp(),
        text: message,
        displayName: displayName,
        photoURL: photoURL,
        email: email,
        mediaUrl: mediaUrl
      });
      setMessage("");
    }
  }, [mediaUrl]);

  console.log(messages)
  return (
    <div className="chat-container">
      <div className="messages-container">
        {file && <ProgressBar now={progress} />}
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
        <label>
          <input type="file" onChange={handleChange} />
          <ImageRoundedIcon />
        </label>
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
