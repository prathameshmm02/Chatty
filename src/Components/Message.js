import { getAuth } from "firebase/auth";
import ReactPlayer from "react-player";
import "../App.css";
import RandomColor from "./RandomColor";

export default function Message(props) {
  let { text, photoURL, displayName, email, mediaUrl } = props.message;
  const auth = getAuth();
  if (photoURL == null) {
    photoURL =
      "https://avatars.dicebear.com/api/initials/" + displayName + ".svg";
  }
  return email === auth.currentUser.email
    ? SentMessage(text, mediaUrl)
    : ReceivedMessage(text, photoURL, displayName, mediaUrl);
}

function SentMessage(text, mediaUrl) {
  return (
    <div className="message-container sent">
      <div className="message sent">
        {mediaUrl && <Media mediaUrl={mediaUrl} /* type={type} */ />}
        {text}
      </div>
    </div>
  );
}

function ReceivedMessage(text, photoURL, name, mediaUrl, type) {
  return (
    <div className="message-container">
      <img className="user-image" src={photoURL} alt="" />
      <div className="message">
        <h6 style={{ color: RandomColor(name) }} className="m-0">
          {name}
        </h6>
        {mediaUrl && <Media mediaUrl={mediaUrl} /* type={type} */ />}
        <p className="m-0">{text}</p>
      </div>
    </div>
  );
}

function Media({ mediaUrl }) {
  return (
    <div className="media">
      <img src={mediaUrl} width={"100%"} height={"auto"} alt=""/>
    </div>
    /* {
        {
          image: <img src={mediaUrl} />,
          video: <ReactPlayer url={mediaUrl} />,
        }[type]
      } */
  );
}
