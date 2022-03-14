import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { useState } from "react";

export default function DeleteChat() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteChat = () => {
      
  };
  return (
    <>
      <button onClick={handleClickOpen} className="mr-2 p-3 transition duration-300 rounded-full hover:bg-slate-400 h-fit">
        <DeleteRounded />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Chat</DialogTitle>
        <DialogContent>
          Do you want to delete this chat permanently?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteChat} >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
