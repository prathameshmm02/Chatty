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
import { ProgressBar } from "react-bootstrap";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { useAlert } from "react-alert";
import useStorage from "../hooks/useStorage";
import ChatHeader from "./ChatHeader";
import PersonalChatHeader from "./PersonalChatHeader";
/**
 * Chat Messages Component
 */
export default function Chat({ id, setSelectedImg, isPersonal }) {
  const db = getFirestore();
  const messagesRef = collection(db, isPersonal ? "personal" : "chats", id, "messages");
  const q = query(messagesRef, orderBy("createdAt"));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [message, setMessage] = useState("");

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [file, setFile] = useState(null);

  const types = ["image", "video", "audio"];

  const alert = useAlert();
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type.substring(0, selected.type.indexOf("/")))) {
      setFile(selected);
    } else {
      setFile(null);
      alert.show("Please select an image file (png, jpg or gif)");
      console.log(selected.type);
    }
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
      const oldFile = file;
      setFile(null);
      const { displayName, photoURL, email } = getAuth().currentUser;

      addDoc(messagesRef, {
        id: Date.now(),
        createdAt: serverTimestamp(),
        text: message,
        displayName: displayName,
        photoURL: photoURL,
        email: email,
        mediaUrl: mediaUrl,
        type: oldFile.type,
      });
      setMessage("");
    }
  }, [mediaUrl]);
  return (
    <div className="chat-container">
      {
        isPersonal ? <PersonalChatHeader /> :
          <ChatHeader id={id} />
      }

      <div className="overflow-y-auto h-[80vh]">
        {file && <ProgressBar now={progress} className="sticky" />}
        {messages &&
          messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              setSelectedImg={setSelectedImg}
            />
          ))}
        <span ref={dummy}></span>
      </div>
      {id && (
        <form
          className="flex flex-row items-center justify-around gap-1 mx-2 h-[10vh] p-2"
          onSubmit={sendMessage}
        >
          <div className="flex flex-row w-full border-2 focus-within:shadow-constant transition duration-300 rounded-2xl border-accent/30 focus-within:border-accent/40 items-center px-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="w-full py-2 mx-2 outline-none bg-transparent"
            />
            <label>
              <input type="file" onChange={handleChange} className="w-0 h-0" />
              <ImageRoundedIcon />
            </label>
          </div>

          <button
            variant="light"
            type="submit"
            disabled={!message}
            className="p-2 disabled:opacity-50 rounded-2xl bg-accent text-center"
          >
            <SendRoundedIcon />
          </button>
        </form>
      )}
    </div>
  );
}
