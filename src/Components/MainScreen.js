import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentChat, resetCurrentChat } from "../state/chatSlice";
import Button from "./button/Button";
import Chat from "./Chat";
import ChatList from "./ChatList";
import Modal from "./Modal";

export default function MainScreen() {
  const { chat } = useSelector(currentChat);
  const dispatch = useDispatch();

  useEffect(() => {
    const escFunction = (e) => {
      if (e.key === "Escape") {
        dispatch(resetCurrentChat());
      }
    };

    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [dispatch]);

  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div>
      <main className="flex flex-row h-screen">
        <ChatList />
        {chat ? (
          <Chat setSelectedImg={setSelectedImg} />
        ) : (
          <h4 className="text-center self-center mx-auto">
            Click on a chat to start chatting
          </h4>
        )}
      </main>
      <DisplayName />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

function DisplayName() {
  const currentUser = getAuth().currentUser;
  const [open, setOpen] = useState(
    currentUser.displayName === null && currentUser.photoURL === null
  );

  const docRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
  getDoc(docRef).then((userInfo) => {
    setOpen(!userInfo.exists());
  });

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const createUser = () => {
    updateProfile(getAuth().currentUser, {
      displayName: name,
      photoURL: photoUrl || currentUser.photoURL,
    });
    const userRef = doc(getFirestore(), "users", currentUser.uid);
    setDoc(userRef, {
      uid: currentUser.uid,
      displayName: name,
      photoUrl: photoUrl || currentUser.photoURL,
      email: currentUser.email,
    });
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: { borderRadius: 20 },
      }}
    >
      <DialogTitle>Your Name</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
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
