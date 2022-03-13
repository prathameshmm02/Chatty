import { useState } from "react";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function NewChat({ chatID }) {
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addUser = async (e) => {
    const chatRef = doc(getFirestore(), "chats", chatID);
    await updateDoc(chatRef, {
      userlist: arrayUnion(email),
    });
    handleClose()
  };
  return (
    <>
      <button
        className="ml-auto px-3 my-1 rounded-full bg-slate-400"
        onClick={handleClickOpen}
      >
        <PersonAddAlt1RoundedIcon />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="User E-Mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addUser} disabled={!email}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}