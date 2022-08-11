import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogActions,
  DialogContent,
  TextField,
  Box,
  Fab,
} from "@mui/material";
import Button from './button/Button'
import AddIcon from "@mui/icons-material/Add";
import { getAuth } from "firebase/auth";
import { useAlert } from "@blaumaus/react-alert";

export default function NewChat() {
  const [open, setOpen] = React.useState(false);
  const alert = useAlert();

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
    const chatsRef = doc(db, "chats", chatID);
    const docSnap = await getDoc(chatsRef);

    if (docSnap.exists()) {
      alert.show("Chat with same ID already exists");
    } else {
      await setDoc(chatsRef, {
        chatDescription: description,
        chatID: chatID,
        chatImage: chatImage,
        chatName: chatName,
        isGroup: true,
        userlist: [getAuth().currentUser.email],
      });
    }

    handleClose();
  };

  return (
    <>
      <div className="add-fab">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 20 },
        }}
      >
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
