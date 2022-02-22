import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatItem from "./ChatItem";
import {
  DialogActions,
  DialogContent,
  TextField,
  Box,
  Fab,
} from "@mui/material";
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";

/*
 * List of all chats
 */
export default function ChatList() {
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
        {chats && chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)}
      </div>
      <NewChat />
    </div>
  );
}

function NewChat() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [chatID, setChatID] = React.useState("");
  const [chatName, setChatName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [chatImage, setChatImage] = React.useState("");

  const createChat = async (e) => {
    const db = getFirestore();
    const chatsRef = collection(db, "chats");
    await addDoc(chatsRef, {
      chatDescription: description,
      chatID: chatID,
      chatImage: chatImage,
      chatName: chatName,
      isGroup: true,
    });
    handleClose();
  };

  return (
    <>
      <div className="add-fab">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Chat</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& > .MuiTextField-root": { m: 1 },
            }}
          >
            <TextField
              margin="normal"
              label="Chat ID"
              value={chatID}
              required
              onChange={(e) => setChatID(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Chat Name"
              value={chatName}
              required
              onChange={(e) => setChatName(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Chat Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Chat Image URL"
              fullWidth
              value={chatImage}
              onChange={(e) => setChatImage(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createChat} disabled={!chatID || !chatName}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
