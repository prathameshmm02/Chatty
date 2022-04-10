import { ExitToAppRounded } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { arrayRemove, doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function LeaveGroup({ id }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const leaveGroup = async (e) => {
    const chatRef = doc(getFirestore(), "chats", { id });
    setDoc(chatRef, {
      userlist: arrayRemove(getAuth().currentUser.email),
    });
    handleClose();
  };
  return (
    <>
      <button
        className="mr-2 p-3 transition duration-300 rounded-full hover:bg-slate-400 h-fit"
        onClick={handleClickOpen}
      >
        <ExitToAppRounded />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 20 },
        }}
      >
        <DialogTitle>Leave group</DialogTitle>
        <DialogContent>Do you want to leave the group?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={leaveGroup}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
