import { signOut } from "firebase/auth";
import React from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { getAuth } from "firebase/auth";

export default function MainScreen() {
  return (
    <div>
      <header>
        <button type="button" className="btn btn-primary" onClick={signOutUser}>
          Sign Out
        </button>
      </header>
      <ChatList />
      <Chat />
    </div>
  );
}
function signOutUser() {
  const auth = getAuth();
  auth.signOut();
}
