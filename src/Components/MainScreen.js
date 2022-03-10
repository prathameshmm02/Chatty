import React, { useCallback, useEffect, useState } from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { getAuth, updateProfile } from "firebase/auth";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function MainScreen() {
  const [chatID, setChatID] = useState(null);
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setChatID(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
  return (
    <div>
      <main className="flex flex-row">
        <ChatList setChatID={setChatID} />
        {chatID ? (
          <Chat id={chatID} />
        ) : (
          <h4> Click on a chat to start chatting</h4>
        )}
      </main>
      <DisplayName />
    </div>
  );
}

function DisplayName() {
  const [open, setOpen] = useState(getAuth().currentUser.displayName === null);

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");

  const createUser = () => {
    updateProfile(getAuth().currentUser, {
      displayName: name,
    });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Your Name</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createUser} disabled={!name}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
