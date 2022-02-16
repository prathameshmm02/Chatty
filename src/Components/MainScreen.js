import React from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";

export default function MainScreen() {
  return (
    <div>
      <header>
        <h3>Chatty</h3>
        <Button variant="primary" onClick={signOutUser}>
          Sign Out
        </Button>
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
