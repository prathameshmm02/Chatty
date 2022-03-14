import { DeleteRounded } from "@mui/icons-material";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AddUser from "./AddUser";
import DeleteChat from "./DeleteChat";

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
              chat.chatImage
                ? chat.chatImage
                : "https://avatars.dicebear.com/api/initials/" +
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
            <AddUser chatID={props.id} />
            <DeleteChat />
          </div>
        </div>
      )}
    </>
  );
}
