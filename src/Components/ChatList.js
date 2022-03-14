import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";
import React, { useState } from "react";
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
    where("userlist", "array-contains", auth.currentUser.email)
  );

  const [chats] = useCollectionData(q, { idField: "chatID" });

  const signOut = () => {
    getAuth().signOut();
  };

  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div className="chatlist-container flex flex-col h-screen">
      <div className="flex flex-row justify-between bg-slate-400 p-2">
        <h3>Chatty</h3>
        <button onClick={signOut}>
          <span className="material-icons rounded-full p-2 hover:bg-slate-200">
            logout
          </span>
        </button>
      </div>
      <div>
        <div className="flex flex-row cursor-pointer text-center ">
          <h6
            className="w-1/2 py-3 m-0"
            onClick={() => {
              setCurrentTab(0);
            }}
          >
            Groups
          </h6>
          <h6
            className="w-1/2 py-3 m-0"
            onClick={() => {
              setCurrentTab(1);
            }}
          >
            Personal
          </h6>
        </div>
        <div
          className={
            "h-1 bg-accent w-1/2 rounded-full transition ease-out duration-300 " +
            (currentTab === 0 ? "translate-x-0" : "translate-x-full")
          }
        ></div>
      </div>

      <div className="overflow-y-scroll flex-grow flex-shrink">
        {chats &&
          chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} setChatID={setChatID} />
          ))}
      </div>
      <NewChat />
    </div>
  );
}
