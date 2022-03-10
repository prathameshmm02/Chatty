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

  const signOut = () => {
    getAuth().signOut();
  };
  return (
    <div className="chatlist-container">
      <div className="flex flex-row justify-between bg-slate-400 p-2">
        <h3>Chatty</h3>
        <button onClick={signOut}>
          <span className="material-icons rounded-full p-2 hover:bg-slate-200">
            logout
          </span>
        </button>
      </div>
      <div className="overflow-y-scroll">
        {chats &&
          chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} setChatID={setChatID} />
          ))}
      </div>
      <NewChat />
    </div>
  );
}
