import React from "react";
import Message from "./Message";
import {
  getFirestore,
  collection,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
/**
 * Chat Messages Component
 */
export default function Chat() {
  const db = getFirestore();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData( q, { idField: "id" });
  return (
    <div>
      {messages &&
        messages.map((msg) => <Message key={msg.id} message={msg} />)}
    </div>
  );
}
