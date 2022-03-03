import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatListItem from "./ChatListItem";
import NewChat from "./NewChat";

/*
 * List of all chats
 */
export default function ChatList({ setChatID }) {
  const auth = getAuth();
  const db = getFirestore();
  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where("userlist", "array-contains", auth.currentUser.uid)
  );

  const [chats] = useCollectionData(q, { idField: "chatID" });
  return (
    <div className="chatlist-container">
      <div className="chatlist">
        {chats &&
          chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} setChatID={setChatID} />
          ))}
      </div>
      <NewChat />
    </div>
  );
}
