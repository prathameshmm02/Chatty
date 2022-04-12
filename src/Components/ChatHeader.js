import { GroupRounded } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { collection, doc, getFirestore, query, where } from "firebase/firestore";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import AddUser from "./AddUser";
import LeaveGroup from "./LeaveGroup";

export default function ChatHeader(props) {
  const chatRef = doc(getFirestore(), "chats", props.id);
  const [chat] = useDocumentData(chatRef);

  return (
    <>
      {chat && (
        <div className="flex flex-row items-center bg-slate-200 h-[10vh]">
          <img
            className="bg-center h-10 w-10 rounded-full m-3"
            src={
              chat.chatImage ||
              "https://avatars.dicebear.com/api/initials/" +
              chat.chatName +
              ".svg"
            }
            alt=""
          />
          <div className="flex flex-col justify-center">
            <h6 className="p-0 m-0">{chat.chatName}</h6>
            <p className="p-0 m-0">{chat.chatDescription}</p>
          </div>
          <div className="ml-auto">
            <UserList chat={chat} />
            <AddUser chatID={props.id} />
            <LeaveGroup chatID={props.id} />
          </div>
        </div>
      )}
    </>
  );

  function UserList({ chat }) {
    const userlist = chat.userlist;
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };


    return (
      <>
        <button
          className="mr-2 p-3 transition duration-300 rounded-full hover:bg-slate-400 h-fit"
          onClick={handleClickOpen}
        >
          <GroupRounded />
        </button>
        <Dialog
        fullWidth
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: { borderRadius: 20 },
          }}
        >
          <DialogTitle>Group members</DialogTitle>
          <DialogContent>
            {userlist && userlist.map(user =>
              <UserItem uid={user} />
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  function UserItem({ uid }) {
    const userRef = collection(getFirestore(), "users");
    const q = query(userRef, where("email", "==", uid))
    const [userlist] = useCollectionData(q);
    let user = null
    if(userlist) {
      user = userlist.at(0)
    }
    
    return user &&
      <div
        className="chatItem-container flex items-center cursor-pointer content-center rounded-xl m-1 w-auto hover:bg-slate-300"
      >
        <img
          className="bg-center h-10 w-10 rounded-full m-3"
          src={
            user.photoUrl ||
            "https://avatars.dicebear.com/api/initials/" +
            user.displayName +
            ".svg"
          }
          alt=""
        />
        <div className="flex flex-col content-center">
          <h6 className="p-0 m-0">{user.displayName}</h6>
        </div>
      </div>
    };

}
