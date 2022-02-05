import { signOut } from "firebase/auth";
import React from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { getAuth } from "firebase/auth";

export default function MainScreen() {
  return (
    <div>
      <header>
        <h3>Chatty</h3>
        <button type="button" className="btn btn-primary" onClick={signOutUser}>
          Sign Out
        </button>
      </header>
      <main>
        <ChatList />
        <Chat />
      </main>
    </div>
  );
}
function signOutUser() {
  const auth = getAuth();
  auth.signOut();
}
