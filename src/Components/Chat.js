import { useAlert } from "@blaumaus/react-alert";
import { AttachFileRounded } from "@mui/icons-material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { getAuth } from "firebase/auth";
import {
  addDoc, collection, getFirestore, orderBy, query, serverTimestamp
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import useStorage from "../hooks/useStorage";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import PersonalChatHeader from "./PersonalChatHeader";
/**
 * Chat Messages Component
 */
export default function Chat({ id, setSelectedImg, isPersonal }) {
  const db = getFirestore();
  const messagesRef = collection(
    db,
    isPersonal ? "personal" : "chats",
    id,
    "messages"
  );
  const q = query(messagesRef, orderBy("createdAt"));

  const [messages] = useCollection(q, { idField: "id" });

  const [message, setMessage] = useState("");

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [file, setFile] = useState(null);

  const types = ["image", "video", "audio"];

  const [currentFileType, setCurrentFileType] = useState(null);

  const alert = useAlert();
  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (
      selected &&
      types.includes(selected.type.substring(0, selected.type.indexOf("/")))
    ) {
      setFile(selected);
      setCurrentFileType(selected.type);
    } else {
      setFile(null);
      setCurrentFileType(null);
      alert.show("Please select an image file (png, jpg or gif)");
      console.log(selected.type);
    }
  };

  const { progress, mediaUrl } = useStorage(file);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { displayName, photoURL, email } = getAuth().currentUser;
    const text = message;
    setMessage("");
    await addDoc(messagesRef, {
      id: Date.now(),
      createdAt: serverTimestamp(),
      text: text,
      displayName: displayName,
      photoURL: photoURL,
      email: email,
    });
  };

  useEffect(() => {
    if (mediaUrl) {
      setFile(null);
      const { displayName, photoURL, email } = getAuth().currentUser;
      const text = message;
      setMessage("");
      addDoc(messagesRef, {
        id: Date.now(),
        createdAt: serverTimestamp(),
        text: text,
        displayName: displayName,
        photoURL: photoURL,
        email: email,
        mediaUrl: mediaUrl,
        type: currentFileType,
      });
      setMessage("");
    }
  }, [mediaUrl]);
  return (
    <div className="chat-container">
      {isPersonal ? <PersonalChatHeader id={id} /> : <ChatHeader id={id} />}
      {file && <progress value={progress} max="100" className="absolute w-[70vw]" />}
      <div className="overflow-y-auto h-[80vh]">
        {messages &&
          messages.docs.map((msg) => (
            <Message
              key={msg.id}
              message={msg.data()}
              id={msg.id}
              chatId={id}
              isPersonal={isPersonal}
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
              <AttachFileRounded className="rotate-45" />
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
