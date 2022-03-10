import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { Button } from "react-bootstrap";

export default function ChatHeader(props) {
  const chatRef = doc(getFirestore(), "chats", props.id);
  const [chat] = useDocumentData(chatRef);
  return (
    <div className="chat-header-container">
      {chat && (
        <div className="flex flex-row">
          <img className="chat-image" src={chat.chatImage} alt="" />
          <div className="chatHeader-textContainer">
            <h6 className="chat-name">{chat.chatName}</h6>
            <p className="chat-desc">{chat.chatDescription}</p>
          </div>
          <Button variant="light">
            <PersonAddAlt1RoundedIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
