import { doc, getFirestore, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
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
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { getAuth } from "firebase/auth";

export default function NewPersonalChat() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createChat = async (e) => {
        const db = getFirestore();
        const chatsRef = collection(db, "personal");
        const userRef = doc(getFirestore(), "users", email)
        getDoc(userRef).then((user) => {
            const uid = user.data().uid;
            addDoc(chatsRef, {
                isGroup: false,
                userlist: [getAuth().currentUser.uid, uid],
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

            <Dialog open={open} onClose={handleClose}>
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