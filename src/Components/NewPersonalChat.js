import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, DialogContent, TextField, Fab } from "@mui/material";
import Button from './button/Button'
import AddIcon from "@mui/icons-material/Add";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export default function NewPersonalChat() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createChat = async (e) => {
    const db = getFirestore();
    const chatsRef = collection(db, "personal");
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((user) => {
      addDoc(chatsRef, {
        isGroup: false,
        userlist: [getAuth().currentUser.uid, user.data().uid],
      });
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

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 20 },
        }}
      >
        <DialogTitle>Create New Chat</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="E-Mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createChat} disabled={!email}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
