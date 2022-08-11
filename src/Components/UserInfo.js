import { getAuth } from "firebase/auth";
import Button from './button/Button'
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, DialogContent, TextField, Box } from "@mui/material";
import { useState } from "react";

export default function UserInfo() {
  const [open, setOpen] = useState(false);

  const docRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
  getDoc(docRef).then((userInfo) => {
    setOpen(!userInfo.exists());
  });

  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const createUser = async (e) => {
    const db = getFirestore();
    const chatsRef = doc(db, "users/" + getAuth().currentUser.uid);
    await setDoc(chatsRef, {
      username: username,
      name: name,
      bio: bio,
    });
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 20 },
        }}
      >
        <DialogTitle>Your Name</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& > .MuiTextField-root": { m: 1 },
            }}
          >
            <TextField
              margin="normal"
              label="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              label="About"
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser} disabled={!username || !name}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
