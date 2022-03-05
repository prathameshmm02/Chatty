import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function ChatHeader(props) {
    console.log(props.id)
    const chatRef = doc(getFirestore(), "chats", props.id);
    const [chat] = useDocumentData(chatRef);
    return <div className="chat-header-container" style={{ backgroundColor: "#ddd" }}>
        {chat && <div className="chatItem-containe" style={{ display: "flex", flexDirection: "row" }}>
            <img className="chat-image" src={chat.chatImage} alt="" />
            <div className="chatHeader-textContainer">
                <h6 className="chat-name">{chat.chatName}</h6>
                <p className="chat-desc">{chat.chatDescription}</p>
            </div>
        </div>}
    </div>
}
