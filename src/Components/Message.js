import { getAuth } from "firebase/auth";
import "../App.css";
import RandomColor from "./RandomColor";

export default function Message(props) {
  let { text, photoURL, displayName } = props.message;
  const auth = getAuth();
  if (photoURL == null) {
    photoURL =
      "https://avatars.dicebear.com/api/initials/" + displayName + ".svg";
  }
  return displayName === auth.currentUser.displayName
    ? SentMessage(text)
    : ReceivedMessage(text, photoURL, displayName);
}

function SentMessage(text) {
  return (
    <div className="message-container sent">
      <p className="message sent">{text}</p>
    </div>
  );
}

function ReceivedMessage(text, photoURL, name) {
  return (
    <div className="message-container">
      <img className="user-image" src={photoURL} alt=""/>
      <div className="message">
        <h6 style={{ color: RandomColor(name) }} className="m-0">
          {name}
        </h6>
        <p className="m-0">{text}</p>
      </div>
    </div>
  );
}
